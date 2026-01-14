// app/pricing/page.tsx
'use client';

import Navigation from '@/components/navigation';
import Pricing from '@/components/pricing';
import Footer from '@/components/footer';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Pricing />
      <Footer />
    </main>
  );
}