import Link from 'next/link';

import { ArrowRight, Circle } from 'lucide-react';

import { SupabaseConnectionCard } from '@/components/dashboard/supabase-connection-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  demoDashboardStats,
  demoPatterns,
  demoQuickStarts,
  demoRecentSessions
} from '@/lib/demo/eq-coach-demo-data';
import { getSupabaseEnvStatus } from '@/lib/supabase/client';

export default function DashboardPage() {
  const supabaseEnv = getSupabaseEnvStatus();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Today</p>
          <h1 className="mt-2 font-serif text-4xl">Good evening. Start where you are.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Work through what is present, notice emotional patterns, and leave with one grounded
            exercise.
          </p>
        </div>
        <Button asChild>
          <Link href="/session/new">
            Start today&apos;s session
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {demoDashboardStats.map((metric) => (
          <Metric key={metric.label} icon={metric.icon} label={metric.label} value={metric.value} />
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_380px]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">What&apos;s on your mind today?</h2>
            <DemoLabel />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {demoQuickStarts.map((start) => (
              <Link
                href={start.href}
                key={start.label}
                className="rounded-lg border bg-background/70 p-4 transition hover:bg-muted/60"
              >
                <div>
                  <p className="font-medium">{start.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{start.prompt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Detected patterns</h2>
            <DemoLabel />
          </div>
          <div className="mt-5 space-y-3">
            {demoPatterns.map((pattern) => (
              <div key={pattern.name} className="rounded-md bg-muted/60 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{pattern.name}</p>
                  <span className="text-sm text-muted-foreground">{pattern.frequency}x</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {pattern.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Recent sessions</h2>
          <DemoLabel />
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {demoRecentSessions.map((session) => (
            <Link
              href="/history"
              key={session.title}
              className="rounded-lg border bg-background/70 p-4 transition hover:bg-muted/60"
            >
              <p className="font-medium">{session.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {session.date} · {session.framework}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {session.emotionTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="mt-5 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">7-day rhythm</h2>
          <DemoLabel />
        </div>
        <div className="mt-5 flex gap-3">
          {[true, true, false, true, true, false, false].map((completed, index) => (
            <span
              key={index}
              className="grid size-9 place-items-center rounded-full border bg-background text-muted-foreground"
            >
              <Circle className={completed ? 'size-3 fill-primary text-primary' : 'size-3'} />
            </span>
          ))}
        </div>
      </Card>

      <div className="mt-5">
        <SupabaseConnectionCard initialEnv={supabaseEnv} />
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <Icon className="mb-4 size-5 text-primary" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <DemoLabel />
      </div>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  );
}

function DemoLabel() {
  return (
    <span className="rounded-full border bg-background/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      Demo
    </span>
  );
}
