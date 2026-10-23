"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/contact",
            handler: "contact.send",
            config: {
                auth: false, // Public endpoint for contact form
                policies: [],
                middlewares: [],
            },
        },
    ],
};
