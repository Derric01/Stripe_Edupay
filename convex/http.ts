import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";
import Stripe from "stripe";

const http = httpRouter();

const clerkWebhook = httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        const { id, email_addresses, first_name, last_name } = evt.data;
        const email = email_addresses[0]?.email_address;
        const name = `${first_name || ""} ${last_name || ""}`.trim();

        try {
            await ctx.runMutation(api.users.createUser, {
                email,
                name,
                clerkId: id,
            });
        } catch (error) {
            console.error("Error creating user in Convex", error);
            return new Response("Error creating user", { status: 500 });
        }
    }
    
    return new Response("Webhook processed successfully", { status: 200 });
});

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: clerkWebhook,
});

// Stripe webhook handler
const stripeWebhook = httpAction(async (ctx, request) => {
    // Initialize Stripe conditionally to avoid errors
    let stripe = null;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
    
    try {
        if (process.env.STRIPE_SECRET_KEY) {
            stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-08-27.basil',
            });
        }
    } catch (error) {
        console.error("Error initializing Stripe:", error);
    }

    try {
        const signature = request.headers.get("stripe-signature");

        if (!signature || !stripe || !webhookSecret) {
            console.log("Stripe webhook skipped: missing signature, Stripe initialization, or webhook secret");
            return new Response("Webhook setup incomplete", { status: 200 });
        }

        // Parse the webhook body
        const body = await request.text();
        
        // Verify the event came from Stripe
        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err) {
            console.error("Webhook signature verification failed", err);
            return new Response("Webhook signature verification failed", { status: 400 });
        }

        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                
                // Update the purchase status in the database
                if (session.id) {
                    try {
                        await ctx.runMutation(api.checkout.confirmPurchase, { 
                          checkoutSessionId: session.id 
                        });
                        console.log("Purchase confirmed for session", session.id);
                    } catch (error) {
                        console.error("Error confirming purchase", error);
                    }
                }
                break;
            }
            // Handle other event types as needed
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return new Response("Success", { status: 200 });
    } catch (error) {
        console.error("Error processing webhook", error);
        return new Response("Server error", { status: 500 });
    }
});

http.route({
    path: "/stripe-webhook",
    method: "POST",
    handler: stripeWebhook,
});

export default http;