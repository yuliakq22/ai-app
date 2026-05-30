import Link from 'next/link';

import { ArrowRight, Brain, ChartNoAxesColumn, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Private, structured coaching',
    body: 'A calm space to name what happened and work with one question at a time.'
  },
  {
    icon: Brain,
    title: 'Grounded frameworks',
    body: 'Uses CBT, NVC, ACT, and DBT-informed exercises without clinical overreach.'
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Track patterns over time',
    body: 'See recurring emotions, triggers, and exercises as your sessions accumulate.'
  }
];

export default function LandingPage() {
  return (
    <div>
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl content-center gap-10 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div className="flex flex-col justify-center animate-fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Emotional intelligence coaching
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] text-calm-ink md:text-7xl">EQ Coach</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            A structured AI coaching space for working through emotional moments, naming patterns,
            and leaving with one practical exercise.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/session/new">
                Begin
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full rounded-lg border bg-card/80 p-4 shadow-soft backdrop-blur animate-fade-up">
            <div className="space-y-3">
              <ChatBubble role="Coach">What emotion feels most present right now?</ChatBubble>
              <ChatBubble role="You" align="right">
                I think it is overwhelm. Something small happened at work, but my reaction felt
                bigger than the situation.
              </ChatBubble>
              <div className="rounded-lg bg-muted/70 p-4">
                <p className="text-sm font-medium">Session snapshot</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <Score label="Emotion" value="Overwhelm" />
                  <Score label="Pattern" value="Perfectionism" />
                  <Score label="Framework" value="CBT" />
                  <Score label="Exercise" value="Thought Record" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t bg-background/55">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="p-5">
              <pillar.icon className="mb-4 size-6 text-primary" />
              <h2 className="font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function ChatBubble({
  role,
  children,
  align
}: {
  role: string;
  children: React.ReactNode;
  align?: 'right';
}) {
  return (
    <div className={align === 'right' ? 'ml-auto max-w-[88%]' : 'max-w-[88%]'}>
      <p className="mb-1 text-xs font-medium text-muted-foreground">{role}</p>
      <div
        className={
          align === 'right'
            ? 'rounded-lg bg-primary p-4 text-sm leading-6 text-primary-foreground'
            : 'rounded-lg border bg-background p-4 text-sm leading-6'
        }
      >
        {children}
      </div>
    </div>
  );
}

function Score({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-background/75 p-3">
      <p className="text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
