import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
      <section>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Human Skills
        </Link>
        <div className="max-w-xl">
          <span className="mb-5 grid size-12 place-items-center rounded-lg bg-secondary/55">
            <ShieldCheck className="size-6 text-calm-ink" />
          </span>
          <h2 className="font-serif text-5xl leading-tight">Keep your practice record private.</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Auth is the first step toward saving sessions, tracking progress, and making coaching
            feel personal without exposing practice data publicly.
          </p>
        </div>
      </section>

      <section className="flex justify-center md:justify-end">
        <LoginForm />
      </section>
    </div>
  );
}
