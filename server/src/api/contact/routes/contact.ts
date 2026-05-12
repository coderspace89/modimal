export default {
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
