'use client';

import { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Loader2, LogIn, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type AuthMode = 'sign-in' | 'sign-up';

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const supabase = getSupabaseBrowserClient();
    const authAction =
      mode === 'sign-in'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`
            }
          });

    const { data, error: authError } = await authAction;

    setIsSubmitting(false);

    if (authError) {
      setError(authError.message);

      return;
    }

    if (mode === 'sign-up' && !data.session) {
      setMessage('Check your email to confirm your account, then come back to sign in.');

      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <Card className="w-full max-w-md p-5 shadow-soft">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Welcome back</p>
        <h1 className="mt-2 font-serif text-4xl">
          {mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Save your practice history and track communication progress over time.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 rounded-lg bg-muted p-1">
        <button
          type="button"
          onClick={() => setMode('sign-in')}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'sign-in' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('sign-up')}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            mode === 'sign-up' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Sign up
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            placeholder="At least 6 characters"
            className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
          />
        </label>

        {error ? (
          <div className="rounded-lg border border-accent/40 bg-accent/15 p-3 text-sm leading-6">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-primary">
            {message}
          </div>
        ) : null}

        <Button className="w-full" type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : mode === 'sign-in' ? (
            <LogIn className="size-4" />
          ) : (
            <UserPlus className="size-4" />
          )}
          {isSubmitting ? 'Working...' : mode === 'sign-in' ? 'Sign in' : 'Create account'}
        </Button>
      </form>
    </Card>
  );
}
