'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { LogOut, UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

import type { User } from '@supabase/supabase-js';

export function AuthNav() {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsReady(true);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  if (!isReady) {
    return (
      <Button variant="outline" size="sm" disabled>
        <UserRound className="size-4" />
        Account
      </Button>
    );
  }

  if (!user) {
    return (
      <Button asChild size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden max-w-40 truncate text-sm text-muted-foreground sm:block">
        {user.email}
      </div>
      <Button variant="outline" size="sm" onClick={signOut}>
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );
}
