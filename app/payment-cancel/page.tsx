// app/payment-cancel/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-destructive/20 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl mt-4">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your payment was cancelled. You can try again or select a different plan.
          </p>
          
          <div className="pt-4 space-y-2">
            <Button 
              onClick={() => router.push('/pricing')} 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Pricing
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push('/')} 
              className="w-full"
            >
              Return to Homepage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}