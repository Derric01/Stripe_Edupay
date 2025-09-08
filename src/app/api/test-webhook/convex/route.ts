import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create a test event
    const event = {
      id: `evt_test_${Date.now()}`,
      object: 'event',
      api_version: '2025-08-27.basil',
      created: Math.floor(Date.now() / 1000),
      data: {
        object: {
          id: `cs_test_${Date.now()}`,
          object: 'checkout.session',
          payment_status: 'paid',
          // Add other necessary properties for testing
        }
      },
      type: 'checkout.session.completed',
      livemode: false,
    };
    
    // Convert to a string
    const payload = JSON.stringify(event);
    
    // Generate a test signature
    const testSignature = `t=${Math.floor(Date.now() / 1000)},v1=${Buffer.from(payload).toString('base64')}`;
    
    try {
      // Make a request to the Convex webhook endpoint
      const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
      if (!convexUrl) {
        return NextResponse.json({
          error: 'NEXT_PUBLIC_CONVEX_URL is not defined',
        }, { status: 500 });
      }
      
      const response = await fetch(`${convexUrl}/stripe-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Stripe-Signature': testSignature,
        },
        body: payload,
      });
      
      const responseBody = await response.text();
      
      return NextResponse.json({
        message: `Test sent to Convex webhook. Response: ${response.status} ${responseBody}`,
        success: response.ok,
      });
    } catch (error) {
      console.error('Error testing Convex webhook:', error);
      return NextResponse.json({
        error: `Error testing Convex webhook: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test Convex webhook route:', error);
    return NextResponse.json({
      error: `Error in test Convex webhook route: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }, { status: 500 });
  }
}
