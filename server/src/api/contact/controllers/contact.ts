import { Context } from "koa";

interface ContactBody {
  fullName: string;
  email: string;
  subject: string;
  orderNumber?: string;
  message: string;
  to?: string;
}

export default {
  async send(ctx: Context) {
    try {
      const {
        fullName,
        email,
        subject,
        orderNumber,
        message,
        to,
      }: ContactBody = ctx.request.body;

      if (!fullName || !email || !subject || !message) {
        return ctx.badRequest("Missing required fields");
      }

      await strapi.plugins["email"].services.email.send({
        to: to || "hello@modimal.com",
        from: strapi.config.get("plugin.email.settings.defaultFrom"),
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${fullName} (${email})</p>
          ${orderNumber ? `<p><strong>Order #:</strong> ${orderNumber}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      ctx.send({ ok: true, message: "Email sent successfully" });
    } catch (err) {
      strapi.log.error("Contact form error:", err);
      ctx.internalServerError("Failed to send email");
    }
  },
};
