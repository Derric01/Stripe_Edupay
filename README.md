# 🎓 Stripe EduPay - Online Course Payment Platform

A modern, full-stack online course platform built with Next.js 14, Convex, Stripe, and Clerk authentication. Students can browse courses, make secure payments, and access their purchased content.

## ✨ Features

- 🔐 **Secure Authentication** - Clerk-based user management
- 💳 **Stripe Payments** - Secure course purchases with webhooks
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- ⚡ **Real-time Database** - Convex for instant data synchronization
- 🎨 **Modern UI** - Beautiful components with Radix UI
- 📊 **Dashboard** - Student progress tracking and course management
- 🧾 **Receipt Generation** - Automatic payment receipts
- 🎉 **Success Animations** - Confetti celebrations for completed purchases

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Convex (Real-time backend)
- **Authentication**: Clerk
- **Payments**: Stripe
- **Deployment Ready**: Optimized for Vercel/Netlify
- Stripe (Payments)
- Tailwind CSS
- shadcn/ui (UI components)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Stripe account
- Clerk account
- Convex account

### Installation

1. Clone the repository

2. Install dependencies
   ```bash
   bun install
   # or
   npm install
   ```

3. Set up environment variables
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Stripe, Clerk, and Convex credentials

4. Start the development server
   ```bash
   bun run dev
   # or
   npm run dev
   ```

5. In a separate terminal, start the Convex development server
   ```bash
   npx convex dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/component`: React components
- `/convex`: Convex backend code
  - `schema.ts`: Database schema
  - `users.ts`: User-related queries and mutations
  - `courses.ts`: Course-related queries
  - `purchases.ts`: Purchase-related operations
  - `stripe.ts`: Stripe integration
  - `checkout.ts`: Checkout-related operations
  - `http.ts`: HTTP endpoints for webhooks

## Setting Up Stripe

1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Set up a webhook endpoint (for local development, use Stripe CLI)
4. Add your keys to `.env.local`

## Setting Up Clerk

1. Create a Clerk application
2. Configure your Clerk application with the correct URLs
3. Add your Clerk keys to `.env.local`

## Setting Up Convex

1. Create a Convex account
2. Initialize your Convex project with `npx convex init`
3. Add your Convex URL to `.env.local`

## Webhook Testing

For local development, you can use the Stripe CLI to forward webhook events:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

For Stripe integration:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)

For Convex:
- [Convex Documentation](https://docs.convex.dev)

For Clerk Authentication:
- [Clerk Documentation](https://clerk.com/docs)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
