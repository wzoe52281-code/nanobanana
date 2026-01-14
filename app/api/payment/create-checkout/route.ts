import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCreemCheckoutSession } from '@/lib/apis/creem-server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  
  try {
    // Get user session
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planName, email, userId, productId } = await req.json();

    // Validate the productId parameter
    const validProductIds = ['prod_4JDhpJbNRTu3cbq5uvCFK'];
    console.log('productId', productId);
    if (!validProductIds.includes(productId)) {
      return Response.json({ error: 'Invalid product' }, { status: 400 });
    }

    // Prepare the success and cancel URLs
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const successUrl = `${origin}/payment-success`;
    const cancelUrl = `${origin}/pricing`;

    // Create the Creem checkout session - this happens server-side
    const checkoutResult = await createCreemCheckoutSession({
      productId,
      customerEmail: email,
      successUrl,
      cancelUrl,
    });

    if (checkoutResult.error) {
      return Response.json({ error: checkoutResult.error }, { status: 500 });
    }

    return Response.json({ url: checkoutResult.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}