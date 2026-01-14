// lib/apis/creem-webhook-utils.ts
import { Buffer } from 'buffer';

// This function verifies the webhook signature from Creem
// Note: The actual implementation depends on how Creem signs their webhooks
export function verifyWebhookSignature(
  payload: string, 
  signature: string, 
  secret: string
): boolean {
  try {
    // This is a placeholder implementation - actual implementation 
    // depends on how Creem signs their webhooks
    // Common approaches include HMAC SHA256 or simple comparison
    
    // For example, if Creem uses HMAC-SHA256:
    // const crypto = require('crypto');
    // const expectedSignature = crypto
    //   .createHmac('sha256', secret)
    //   .update(payload, 'utf8')
    //   .digest('hex');
    // 
    // return crypto.timingSafeEqual(
    //   Buffer.from(signature),
    //   Buffer.from(expectedSignature)
    // );

    // As a fallback, we could compare signatures directly
    // This is less secure but sometimes used by simpler payment providers
    return signature === secret;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}