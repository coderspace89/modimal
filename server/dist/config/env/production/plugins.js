"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    email: {
        config: {
            provider: "nodemailer",
            providerOptions: {
                host: env("MAILTRAP_HOST", "sandbox.smtp.mailtrap.io"),
                port: env.int("MAILTRAP_PORT", 2525),
                auth: {
                    user: env("MAILTRAP_USER"),
                    pass: env("MAILTRAP_PASS"),
                },
                tls: {
                    rejectUnauthorized: false,
                },
            },
            settings: {
                defaultFrom: "no-reply@modimal.com",
                defaultReplyTo: "support@modimal.com",
            },
        },
    },
});
