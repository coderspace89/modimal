# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

### Render deployment

This repository includes a Render Blueprint at `render.yaml` for the Strapi web service. It builds from `server/Dockerfile` on the `agents/no-pull-requests-yet` branch and uses the committed `server/dist/` output, avoiding the memory-intensive Strapi admin build on Render.

Create a free Neon PostgreSQL database, then create a Render Blueprint from this repository and select the deployment branch. Render will prompt for `DATABASE_URL` and the Strapi secrets. Use Neon's pooled connection string for `DATABASE_URL`; keep `DATABASE_SSL=true`. Generate fresh secrets for `APP_KEYS` (four comma-separated random strings), `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, and `ENCRYPTION_KEY`. Never reuse the secrets posted in chat. Do not set `PORT`; Render supplies it.

Once deployed, use the Render service's `onrender.com` URL as Vercel's `NEXT_PUBLIC_STRAPI_CLOUD_URL` (base URL only, no `/api`) and redeploy the frontend.

Render Free web services sleep after 15 minutes without traffic, take about a minute to wake, and have an ephemeral filesystem. Neon Free is the persistent database, but Strapi uploads stored on the service filesystem will disappear after restarts or redeploys. For an interview demo, seed the database, verify API requests and media, then open/wake the backend before presenting. Free services are intended for testing and hobby projects, not production; confirm the current provider limits before relying on them.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
