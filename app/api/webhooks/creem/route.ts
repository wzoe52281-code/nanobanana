import { NextRequest } from 'next/server';
import { handleCreemWebhook } from '@/lib/apis/creem-api';

export async function POST(request: NextRequest) {
  try {
    // This route is server-side only, so sensitive operations are safe here
    return await handleCreemWebhook(request);
  } catch (error) {
    console.error('Error processing Creem webhook:', error);
    return new Response('Bad Request', { status: 400 });
  }
}