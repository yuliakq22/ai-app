'use client';

import { useState } from 'react';
import { CheckCircle2, Database, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SupabaseHealthResult = {
  ok: boolean;
  status: 'connected' | 'missing_env' | 'request_failed' | 'network_error';
  message: string;
  httpStatus?: number;
  latencyMs?: number;
  projectUrl?: string | null;
  keyStatus?: {
    ok: boolean;
    role?: string;
    expiresAt?: string | null;
    message: string;
  };
  env?: {
    hasUrl: boolean;
    hasAnonKey: boolean;
    projectUrl: string | null;
  };
};

export function SupabaseConnectionCard({
  initialEnv
}: {
  initialEnv: {
    hasUrl: boolean;
    hasAnonKey: boolean;
    projectUrl: string | null;
  };
}) {
  const [result, setResult] = useState<SupabaseHealthResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  async function testConnection() {
    setIsChecking(true);

    try {
      const response = await fetch('/api/supabase/health', {
        cache: 'no-store'
      });
      const data = (await response.json()) as SupabaseHealthResult;
      setResult(data);
    } catch (error) {
      setResult({
        ok: false,
        status: 'network_error',
        message: error instanceof Error ? error.message : 'Unable to reach the health endpoint.'
      });
    } finally {
      setIsChecking(false);
    }
  }

  const activeResult = result ?? {
    ok: initialEnv.hasUrl && initialEnv.hasAnonKey,
    status: initialEnv.hasUrl && initialEnv.hasAnonKey ? 'connected' : 'missing_env',
    message:
      initialEnv.hasUrl && initialEnv.hasAnonKey
        ? 'Environment variables are present. Run the test to verify the network connection.'
        : 'Add Supabase environment variables, then restart the dev server.',
    projectUrl: initialEnv.projectUrl
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-secondary/55">
            <Database className="size-5 text-calm-ink" />
          </span>
          <div>
            <h2 className="font-semibold">Supabase connection</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Check that the dashboard can reach your Supabase project with the anon key.
            </p>
          </div>
        </div>
        <StatusPill ok={activeResult.ok} status={activeResult.status} />
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <Row label="Project URL" value={activeResult.projectUrl ?? 'Not configured'} />
        <Row label="URL env" value={initialEnv.hasUrl ? 'Present' : 'Missing'} />
        <Row label="Anon key env" value={initialEnv.hasAnonKey ? 'Present' : 'Missing'} />
        {activeResult.httpStatus ? (
          <Row label="HTTP status" value={String(activeResult.httpStatus)} />
        ) : null}
        {typeof activeResult.latencyMs === 'number' ? (
          <Row label="Latency" value={`${activeResult.latencyMs} ms`} />
        ) : null}
        {activeResult.keyStatus?.role ? (
          <Row label="Key role" value={activeResult.keyStatus.role} />
        ) : null}
      </div>

      <div
        className={cn(
          'mt-5 rounded-lg border p-4 text-sm leading-6',
          activeResult.ok
            ? 'border-primary/20 bg-primary/5 text-primary'
            : 'border-accent/40 bg-accent/15 text-calm-ink'
        )}
      >
        {activeResult.message}
      </div>

      <Button className="mt-5 w-full" onClick={testConnection} disabled={isChecking}>
        {isChecking ? <Loader2 className="size-4 animate-spin" /> : <Database className="size-4" />}
        {isChecking ? 'Testing connection...' : 'Test Supabase connection'}
      </Button>
    </Card>
  );
}

function StatusPill({ ok, status }: { ok: boolean; status: SupabaseHealthResult['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        ok ? 'border-primary/20 bg-primary/5 text-primary' : 'border-accent/40 bg-accent/15'
      )}
    >
      {ok ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
      {status.replace('_', ' ')}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-muted/55 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] truncate font-medium">{value}</span>
    </div>
  );
}
