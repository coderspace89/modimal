export default {
  async afterCreate(event) {
    const { result } = event;

    // 1. Log everything to see if lifecycle fires
    strapi.log.info("=== ORDER LIFECYCLE FIRED ===");
    strapi.log.info(
      `Order ID: ${result.id}, OrderNumber: ${result.orderNumber}`,
    );
    strapi.log.info(
      `Email: ${result.email}, PaymentStatus: ${result.paymentStatus}`,
    );

    // 2. Only send if paid
    if (result.paymentStatus !== "paid") {
      strapi.log.warn(
        `Skipping email: paymentStatus is "${result.paymentStatus}", not "paid"`,
      );
      return;
    }

    // 3. Guard against null data
    if (!result.email) {
      strapi.log.error("Skipping email: result.email is missing");
      return;
    }

    const items = result.items || [];
    const shippingAddress = result.shippingAddress || {};

    try {
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject: `Order Confirmation #${result.orderNumber}`,
        html: `
          <h1>Payment Successful!</h1>
          <p>Hi ${shippingAddress.firstName || "Customer"},</p>
          <p>Your order #${result.orderNumber} for $${result.total} has been confirmed.</p>
          <h3>Items:</h3>
          <ul>
            ${items
              .map(
                (item) =>
                  `<li>${item.name} - ${item.size || "N/A"} / ${item.color || "N/A"} - Qty: ${item.quantity} - $${item.price}</li>`,
              )
              .join("")}
          </ul>
        `,
      });
      strapi.log.info(`✅ Order email sent to ${result.email}`);
    } catch (err) {
      strapi.log.error("❌ Email failed:", err);
    }
  },
};
