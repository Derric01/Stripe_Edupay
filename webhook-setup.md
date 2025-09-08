# Setting Up Stripe Webhooks for Your Payment Application

This guide will help you set up and test Stripe webhooks for both local development and production environments.

## Webhook Integration Options

Your application supports two webhook integration methods:

1. **Next.js API Route**: `/api/webhooks/stripe`
2. **Convex HTTP Handler**: Directly integrated with your Convex backend at `/stripe-webhook`

For most use cases, using the Next.js API route is recommended for local development, while the Convex integration can be more powerful for production.

## Prerequisites
- Stripe CLI installed ([download here](https://stripe.com/docs/stripe-cli))
- Your application running locally (using `bunx run dev`)
- Stripe account with API keys configured in your `.env.local` file

## Setting Up Webhooks for Local Development

### 1. Log in to Stripe CLI

Open a terminal and run:

```bash
stripe login
```

Follow the prompts to authenticate with your Stripe account.

### 2. Start the Webhook Forwarding

Run the following command to start listening for webhook events and forwarding them to your local server:

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

This command will output a webhook signing secret. It should look something like:

```
Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxxxxxxxxx
```

### 3. Update Your .env.local File

Copy the webhook signing secret and update your `.env.local` file:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx
```

### 4. Test Your Webhook

You can test your webhook implementation in two ways:

#### A. Using the Stripe CLI:

```bash
stripe trigger checkout.session.completed
```

This will send a test webhook to your local endpoint.

#### B. Using the Built-in Test Page:

Navigate to [http://localhost:3000/webhook-test](http://localhost:3000/webhook-test) to access the built-in testing tools.

## How It Works

### Purchase Flow:

1. User initiates a purchase by clicking "Enroll Now" on a course
2. The app creates a Stripe checkout session and redirects the user to Stripe
3. User completes payment on Stripe's hosted checkout page
4. Stripe sends a `checkout.session.completed` webhook to your application
5. Your webhook handler verifies the event and confirms the purchase in your database
6. User is redirected to the success page

### Webhook Processing:

For Next.js webhook handling:
- Webhook events are received at `/api/webhooks/stripe`
- Events are verified using the webhook secret
- The handler processes the event and updates the database via Convex

For Convex webhook handling:
- Webhook events are received directly by Convex at `/stripe-webhook`
- Events are verified and processed directly within Convex
- The database is updated immediately

## Troubleshooting

### Common Issues:

1. **Webhook Signature Verification Failed**
   - Make sure you've correctly set the `STRIPE_WEBHOOK_SECRET` in your environment variables
   - Ensure you're using the raw request body for verification
   - Verify the signature header is being passed correctly

2. **Connection Issues**
   - Make sure your server is running and accessible at localhost:3000
   - Check that no firewall is blocking the connection

3. **Server Errors**
   - Check your server logs for detailed error messages
   - Verify that your endpoint is handling the webhook event types properly

## Going to Production

When deploying to production:

1. Create a webhook endpoint in the [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Configure it to point to your production webhook URL
3. Get the production webhook secret from the Stripe Dashboard
4. Update your production environment variables with the new webhook secret

For additional security in production:
- Consider implementing IP restrictions for webhook endpoints
- Add additional validation for webhook events
- Set up monitoring and alerts for webhook failures
