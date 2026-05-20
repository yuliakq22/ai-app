import Link from "next/link";
import { ArrowRight, CalendarDays, Flame, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { assertivenessScenarios } from "@/lib/ai/scenarios";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Today</p>
          <h1 className="mt-2 font-serif text-4xl">Practice with intention</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Build assertive communication through short, realistic simulations.
          </p>
        </div>
        <Button asChild>
          <Link href="/scenarios">
            Choose scenario
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric icon={Flame} label="Current streak" value="3 days" />
        <Metric icon={MessageCircle} label="Practice sessions" value="12" />
        <Metric icon={CalendarDays} label="Next focus" value="Boundaries" />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <h2 className="font-semibold">Recommended next</h2>
          <div className="mt-5 space-y-4">
            {assertivenessScenarios.slice(0, 3).map((scenario) => (
              <Link
                href={`/session/${scenario.id}`}
                key={scenario.id}
                className="flex items-center justify-between rounded-lg border bg-background/70 p-4 transition hover:bg-muted/60"
              >
                <div>
                  <p className="font-medium">{scenario.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{scenario.summary}</p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">Skill balance</h2>
          <div className="mt-5 space-y-5">
            <Bar label="Clarity" value={74} />
            <Bar label="Empathy" value={82} />
            <Bar label="Assertiveness" value={68} />
            <Bar label="Confidence" value={71} />
          </div>
        </Card>
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
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </Card>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{value}</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
