// components/login-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'redirect' | 'modal';
  asChild?: boolean;
}

export function LoginButton({ children, mode = 'redirect', asChild }: LoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  if (asChild && children) {
    return (
      <span onClick={onClick} className="cursor-pointer">
        {children}
      </span>
    );
  }

  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? 'Loading...' : children}
    </Button>
  );
}