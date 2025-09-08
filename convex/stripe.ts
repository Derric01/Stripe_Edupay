import { action } from "./_generated/server";
import { v } from "convex/values";
import Stripe from "stripe";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Initialize Stripe conditionally to avoid errors during development
let stripe: Stripe | null = null;
try {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey && stripeKey.startsWith('sk_')) {
    stripe = new Stripe(stripeKey, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
    });
    console.log("✅ Stripe initialized successfully with key:", stripeKey.substring(0, 12) + "...");
  } else {
    console.warn("⚠️ STRIPE_SECRET_KEY not found or invalid in environment variables");
  }
} catch (error) {
  console.error("❌ Error initializing Stripe:", error);
}

// Define a return type for our action
interface CheckoutResult {
  checkoutUrl: string;
  sessionId: string;
}

export const createCheckoutSession = action({
  args: {
    courseId: v.id("courses"),
  },
  handler: async (ctx, args): Promise<CheckoutResult> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to purchase a course");
    }

    // Get user from database
    const user = await ctx.runQuery(api.users.getUserByClerkId, { 
      clerkId: identity.subject 
    });
    
    if (!user) {
      throw new Error("User not found");
    }

    // Get course information
    const course = await ctx.runQuery(api.courses.getCourseById, { 
      courseId: args.courseId 
    });
    
    if (!course) {
      throw new Error("Course not found");
    }

    // Create a checkout session
    try {
      // Create base URL for success and cancel URLs
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      
      // Handle the case where Stripe is not initialized
      if (!stripe) {
        console.warn("⚠️ Stripe is not initialized. Using mock checkout URL for development.");
        
        // For development, create a mock checkout session that redirects to a test payment page
        // Also directly create a completed purchase record
        await ctx.runMutation(api.purchases.createPurchase, {
          userId: user._id,
          courseId: course._id,
          isPaid: true,
        });
        
        return { 
          checkoutUrl: `${baseUrl}/success?course=${course._id}&session_id=mock_session_${Date.now()}`,
          sessionId: `mock_session_${Date.now()}`
        };
      }
      
      console.log("🚀 Creating Stripe checkout session for:", {
        courseTitle: course.title,
        coursePrice: course.price,
        userId: user._id,
        userEmail: identity.email
      });
      
      // Create real Stripe session with enhanced configuration
      const result = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: course.title,
                description: course.description,
                images: course.imageUrl ? [course.imageUrl] : undefined,
              },
              unit_amount: Math.round(course.price * 100), // Ensure cents conversion is correct
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&course=${course._id}`,
        cancel_url: `${baseUrl}/courses/${course._id}?canceled=true`,
        metadata: {
          userId: user._id,
          courseId: course._id,
          courseName: course.title,
        },
        customer_email: identity.email,
        payment_intent_data: {
          description: `Purchase of ${course.title} course`,
          metadata: {
            userId: user._id,
            courseId: course._id,
          },
        },
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        phone_number_collection: {
          enabled: false,
        },
      });

      // Create a pending purchase record in the database
      await ctx.runMutation(api.purchases.createPurchase, {
        userId: user._id,
        courseId: course._id,
        isPaid: false,
        checkoutSessionId: result.id
      });

      console.log("✅ Stripe checkout session created successfully:", {
        sessionId: result.id,
        checkoutUrl: result.url,
        amount: course.price,
        currency: "USD"
      });

      return { 
        checkoutUrl: result.url || "",
        sessionId: result.id 
      };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  },
});

export const verifyPaymentSession = action({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args): Promise<boolean> => {
    console.log("🔍 Verifying payment session:", args.sessionId);
    
    // If not running in production, auto-confirm the purchase for mock sessions
    if (!stripe || args.sessionId.startsWith('mock_session_')) {
      console.warn("⚠️ Stripe is not initialized or mock session detected. Auto-confirming purchase for development.");
      
      // Find the purchase by sessionId
      const purchases = await ctx.runQuery(api.purchases.getPurchaseBySessionId, {
        checkoutSessionId: args.sessionId
      });
      
      if (purchases && purchases.length > 0) {
        // Update purchase to paid
        await ctx.runMutation(api.purchases.updatePurchaseStatus, {
          checkoutSessionId: args.sessionId,
          isPaid: true
        });
        console.log("✅ Mock purchase confirmed successfully");
        return true;
      }
      
      console.log("❌ No purchase found for session:", args.sessionId);
      return false;
    }
    
    try {
      // Retrieve the session from Stripe
      const session = await stripe.checkout.sessions.retrieve(args.sessionId);
      
      console.log("📋 Stripe session details:", {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        amount: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_email
      });
      
      // Check if the payment was successful
      if (session.payment_status === 'paid') {
        // Update the purchase in our database
        await ctx.runMutation(api.purchases.updatePurchaseStatus, {
          checkoutSessionId: args.sessionId,
          isPaid: true
        });
        
        console.log("✅ Payment verified and purchase confirmed for session:", args.sessionId);
        return true;
      }
      
      console.log("❌ Payment not completed. Status:", session.payment_status);
      return false;
    } catch (error) {
      console.error("❌ Error verifying payment session:", error);
      return false;
    }
  }
});
