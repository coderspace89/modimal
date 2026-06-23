# Modimal

Modimal is a modern full-stack web platform built using a decoupled headless architecture. It utilizes a high-performance frontend gateway paired with a flexible headless CMS and standard-grade payment processing.

Live Demo: [modimal-theta.vercel.app](https://vercel.app)

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- **Backend / CMS:** [Strapi CMS v5](https://strapi.io/) (Headless Content Management)
- **Database:** [PostgreSQL](https://postgresql.org) (Production-ready data persistence)
- **Payments:** [Stripe API](https://stripe.com) (Secure checkout sessions and webhooks)

---

## 📁 Repository Structure

```text
modimal/
├── client/          # Next.js frontend application (Gateway & UI)
└── server/          # Strapi CMS backend application (API & Core Logic)
```

---

## 🚀 Getting Started

Follow these instructions to spin up the entire ecosystem on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v18.x or v20.x recommended)
- [PostgreSQL](https://postgresql.orgdownload/) (running locally or hosted)
- [Stripe CLI](https://stripe.com) (for testing payment webhooks locally)

---

### 1. Database Setup (PostgreSQL)

Create a blank PostgreSQL database on your local instance or cloud provider:
```sql
CREATE DATABASE modimal_db;
```

---

### 2. Backend Configuration (Strapi Server)

1. Navigate to the server folder and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the `server/` directory and populate it with your database and Stripe credentials:
   ```env
   # Server Configuration
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=your_generated_app_keys

   # Database Configuration (PostgreSQL)
   DATABASE_CLIENT=postgres
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_NAME=modimal_db
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=your_postgres_password
   DATABASE_SSL=false

   # Stripe Keys
   STRIPE_SECRET_KEY=sk_test_...
   ```

3. Launch the Strapi development server:
   ```bash
   npm run dev
   ```
   *Visit `http://localhost:1337/admin` to set up your administrator account and explore the Content Manager.*

---

### 3. Frontend Configuration (Next.js Client)

1. Open a new terminal window, navigate to the client folder, and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Create a `.env.local` file in the `client/` directory:
   ```env
   # API Connections
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your_generated_strapi_api_token

   # Stripe Public Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. Launch the Next.js development server:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:3000` to view the frontend application.*

---

## 💳 Stripe Payment Flow & Webhooks

To securely process checkouts and synchronize application states via Stripe:

1. **Checkout Sessions:** The Next.js frontend sends cart details to custom API routes, which communicate with Strapi to validate product mapping and initiate a [Stripe Checkout Session](https://stripe.comdocs/payments/checkout).
2. **Local Webhook Testing:** Use the Stripe CLI to forward events directly to your local instance during testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Copy the webhook signing secret (`whsec_...`) printed in your terminal and save it to your client `.env.local` file to handle order fulfillment safely.

---

## 🌐 Deployment

### Frontend (Next.js)
The frontend builds optimized server-less functions natively on [Vercel](https://vercel.com). Connect your GitHub repository, assign the root directory to `client`, and set up environment keys.

### Backend & Database (Strapi + Postgres)
The backend containerizes easily for deployments to [Railway](https://railway.app), Render, or DigitalOcean, backed by an attached managed PostgreSQL cluster.
