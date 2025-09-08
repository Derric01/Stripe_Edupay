import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const sessionId = params.sessionId;
    
    // Skip actual Stripe call for mock sessions (for testing)
    if (sessionId.startsWith('mock_session_')) {
      // Return a mock receipt
      return new NextResponse(
        JSON.stringify({
          receiptUrl: null,
          receiptData: {
            id: sessionId,
            amount_total: 9900,
            currency: 'usd',
            customer_details: {
              email: 'test@example.com',
              name: 'Test User',
            },
            created: Date.now() / 1000,
            payment_status: 'paid',
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // For real Stripe sessions, fetch from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });

    // Also get the customer if available
    let customer = null;
    if (session.customer) {
      customer = await stripe.customers.retrieve(session.customer as string);
    }

    // Check if there's a receipt URL in the payment intent
    let receiptUrl = null;
    if (session.payment_intent) {
      // Get the payment intent details
      const paymentIntentId = typeof session.payment_intent === 'string' 
        ? session.payment_intent 
        : session.payment_intent.id;
        
      try {
        // Get the charges for this payment intent directly
        const charges = await stripe.charges.list({
          payment_intent: paymentIntentId,
        });
        
        // Extract receipt URL if available
        if (charges.data.length > 0) {
          receiptUrl = charges.data[0].receipt_url;
        }
      } catch (paymentError) {
        console.error('Error fetching payment details:', paymentError);
        // Continue without receipt URL
      }
    }

    // Return the receipt URL and session data
    return new NextResponse(
      JSON.stringify({
        receiptUrl,
        receiptData: {
          ...session,
          customer,
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error retrieving receipt:', error instanceof Error ? error.message : 'Unknown error');
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to retrieve receipt',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
