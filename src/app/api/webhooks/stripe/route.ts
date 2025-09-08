import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  console.log("🎣 Stripe webhook received");
  
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    console.error("❌ Missing stripe-signature header");
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }
  
  let event: Stripe.Event;
  
  try {
    // Verify the webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    console.log("✅ Webhook signature verified successfully");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`⚠️ Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }
  
  // Handle the event
  try {
    console.log(`📨 Processing webhook event: ${event.type}`);
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        console.log("💳 Checkout session completed:", {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_email,
          amount: session.amount_total,
          currency: session.currency
        });
        
        // Verify that payment was successful
        if (session.payment_status === 'paid') {
          console.log(`💰 Payment successful for session ${session.id}`);
          
          // Extract the checkout session ID
          const checkoutSessionId = session.id;
          
          // Update purchase status in our database
          if (checkoutSessionId) {
            try {
              // Try to use checkout.confirmPurchase first (legacy approach)
              await convex.mutation(api.checkout.confirmPurchase, {
                checkoutSessionId: checkoutSessionId
              });
              console.log(`✅ Purchase confirmed for session ${checkoutSessionId} via checkout.confirmPurchase`);
            } catch (checkoutError) {
              console.error(`Failed to confirm purchase via checkout: ${checkoutError}`);
              // Fallback to direct update via purchases.updatePurchaseStatus
              try {
                await convex.mutation(api.purchases.updatePurchaseStatus, {
                  checkoutSessionId: checkoutSessionId,
                  isPaid: true
                });
                console.log(`✅ Purchase confirmed for session ${checkoutSessionId} via purchases.updatePurchaseStatus`);
              } catch (updateError) {
                console.error(`Failed to update purchase status: ${updateError}`);
                throw updateError;
              }
            }
          }
        } else {
          console.log(`⚠️ Payment not completed for session ${session.id}. Status: ${session.payment_status}`);
        }
        break;
        
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`💰 Payment intent succeeded: ${paymentIntent.id}`, {
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status
        });
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment intent failed: ${failedPayment.id}`, {
          amount: failedPayment.amount,
          currency: failedPayment.currency,
          lastPaymentError: failedPayment.last_payment_error
        });
        break;
        
      default:
        console.log(`🤷 Unhandled event type: ${event.type}`);
    }
    
    // Return a response to acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Error processing webhook: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook processing error: ${errorMessage}` }, { status: 500 });
  }
}
