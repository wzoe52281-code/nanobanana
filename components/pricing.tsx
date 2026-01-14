'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, Loader2 } from 'lucide-react';
import { useUser } from '../components/user-context';
import { PRODUCT_IDS } from '@/lib/apis/creem-client';

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular?: boolean;
  buttonText?: string;
  productId: string;
}

export default function Pricing() {
  const { user, isLoading: userLoading } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        '5 image generations/day',
        'Standard quality output',
        'Basic editing tools',
        'Community support'
      ],
      cta: 'Get Started',
      buttonText: 'Current Plan',
      productId: PRODUCT_IDS.FREE
    },
    {
      name: 'Pro',
      description: 'For power users and creators',
      price: '$9',
      period: '/month',
      features: [
        'Unlimited image generations',
        'High quality output',
        'Advanced editing tools',
        'Priority support',
        'Early access to new features',
        'Commercial license'
      ],
      cta: 'Upgrade to Pro',
      popular: true,
      buttonText: 'Month Plan',
      productId: PRODUCT_IDS.PRO,
    },
    {
      name: 'Team',
      description: 'For teams and businesses',
      price: '$29',
      period: '/month',
      features: [
        'Everything in Pro plan',
        'Up to 5 team members',
        'Shared projects',
        'Admin dashboard',
        'Custom integrations',
        'Dedicated support'
      ],
      cta: 'Start Free Trial',
      buttonText: 'PRO PLAN',
      productId: PRODUCT_IDS.TEAM
    }
  ];

  const handlePayment = async (plan: PricingPlan) => {
    // Don't allow free plan selection to trigger payment flow
    if (plan.productId === PRODUCT_IDS.FREE) {
      return;
    }

    if (!user) {
      window.location.href = '/auth/callback';
      return;
    }

    setLoading(plan.name);
    
    try {
      // Call our backend API route which securely communicates with Creem
      const response = await fetch('/api/payment/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          planName: plan.name,
          userId: user.id,
          productId: plan.productId
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        // Redirect to the Creem payment page
        window.location.href = data.url;
      } else {
        console.error('Failed to create payment session:', data.error);
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error creating payment session:', error);
      alert('An error occurred during payment setup. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="w-full py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col relative overflow-hidden ${
                plan.popular ? 'ring-2 ring-accent scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground py-1 px-4">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePayment(plan)}
                  disabled={loading === plan.name || userLoading}
                  className={`mt-8 w-full ${
                    plan.popular ? 'bg-accent hover:bg-accent/90' : ''
                  }`}
                  variant={plan.productId === PRODUCT_IDS.FREE ? 'outline' : 'default'}
                >
                  {loading === plan.name ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : plan.productId === PRODUCT_IDS.FREE ? (
                    plan.buttonText
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto mt-16 text-center text-sm text-muted-foreground">
          <p>All plans include our core AI image editing features. Prices shown in USD. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}