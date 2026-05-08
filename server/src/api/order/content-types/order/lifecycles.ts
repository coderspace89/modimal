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
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #198754; margin: 0;">Payment Successful!</h1>
  </div>
  
  <p>Hi ${shippingAddress.firstName},</p>
  <p>Thanks for your order. We're getting it ready to ship.</p>
  
  <div style="background: #f8f9fa; padding: 16px; margin: 24px 0; border-left: 4px solid #198754;">
    <strong>Order #${result.orderNumber}</strong><br>
    <span style="color: #6c757d;">Placed on ${new Date(result.createdAt).toLocaleDateString()}</span>
  </div>

  <h3>Items Ordered</h3>
  <table style="width: 100%; border-collapse: collapse;">
    ${items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          <small style="color: #6c757d;">Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity}</small>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right; vertical-align: top;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `,
      )
      .join("")}
  </table>

  <table style="width: 100%; margin-top: 24px;">
    <tr><td>Subtotal:</td><td style="text-align: right;">$${result.subtotal.toFixed(2)}</td></tr>
    <tr><td>Tax:</td><td style="text-align: right;">$${result.tax.toFixed(2)}</td></tr>
    <tr><td>Shipping:</td><td style="text-align: right;">${result.shipping === 0 ? "Free" : "$" + result.shipping.toFixed(2)}</td></tr>
    <tr style="border-top: 2px solid #000;">
      <td style="padding-top: 12px; font-weight: bold; font-size: 18px;">Total:</td>
      <td style="padding-top: 12px; text-align: right; font-weight: bold; font-size: 18px;">$${result.total.toFixed(2)}</td>
    </tr>
  </table>

  <h3 style="margin-top: 32px;">Shipping To</h3>
  <p>
    ${shippingAddress.firstName} ${shippingAddress.lastName}<br>
    ${shippingAddress.address}<br>
    ${shippingAddress.apartment ? shippingAddress.apartment + "<br>" : ""}
    ${shippingAddress.city}, ${shippingAddress.postalCode}<br>
    ${shippingAddress.country}
  </p>

  <div style="text-align: center; margin-top: 40px;">
    <a href="${process.env.FRONTEND_URL}/account/orders" 
       style="background: #000; color: #fff; padding: 14px 32px; text-decoration: none; display: inline-block;">
      Track Your Order
    </a>
  </div>

  <p style="margin-top: 40px; font-size: 12px; color: #6c757d; text-align: center;">
    Questions? Reply to this email or call +1(929)460-3208
  </p>
</body>
</html>
`,
      });
      strapi.log.info(`✅ Order email sent to ${result.email}`);
    } catch (err) {
      strapi.log.error("❌ Email failed:", err);
    }
  },
};
