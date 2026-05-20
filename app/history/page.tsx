import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const sessions = [
  { title: "Saying no to extra work", date: "Today", score: 84 },
  { title: "Setting boundaries with friends", date: "Yesterday", score: 79 },
  { title: "Returning incorrect food", date: "May 17", score: 88 }
];

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Session history</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Recent practice sessions and coaching summaries will be stored here as the database layer
        is connected to saved sessions.
      </p>
      <div className="mt-8 space-y-4">
        {sessions.map((session) => (
          <Card key={session.title} className="flex items-center justify-between p-5">
            <div>
              <p className="font-medium">{session.title}</p>
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
