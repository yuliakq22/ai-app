import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { demoHistorySessions } from '@/lib/demo/product-demo-data';

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Session history</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        This page currently shows demo sessions. Once persistence is wired, it will read saved
        practice sessions from the database.
      </p>
      <div className="mt-8 space-y-4">
        {demoHistorySessions.map((session) => (
          <Card key={session.title} className="flex items-center justify-between p-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{session.title}</p>
                <DemoLabel />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{session.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold">{session.score}</span>
              <Link href="/scenarios" aria-label="Practice again">
                <ArrowRight className="size-5 text-muted-foreground" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DemoLabel() {
  return (
    <span className="rounded-full border bg-background/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      Demo
    </span>
  );
}
