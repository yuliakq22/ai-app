import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { demoProgressAverages, demoProgressTimeline } from '@/lib/demo/product-demo-data';

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Progress</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        This page currently shows demo progress. Once saved evaluations are connected, these charts
        will be calculated from real practice sessions.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Current average</h2>
            <DemoLabel />
          </div>
          <div className="mt-5 space-y-5">
            {demoProgressAverages.map((skill) => (
              <Skill key={skill.label} label={skill.label} value={skill.value} />
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Progress timeline</h2>
            <DemoLabel />
          </div>
          <div className="mt-6 grid h-72 grid-cols-4 items-end gap-4">
            {demoProgressTimeline.map((point) => (
              <div key={point.label} className="flex h-full flex-col justify-end gap-3">
                <div className="flex flex-1 items-end gap-2">
                  <div
                    className="w-full rounded-t-md bg-secondary"
                    style={{ height: `${point.clarity}%` }}
                    title={`Clarity ${point.clarity}`}
                  />
                  <div
                    className="w-full rounded-t-md bg-primary"
                    style={{ height: `${point.assertiveness}%` }}
                    title={`Assertiveness ${point.assertiveness}`}
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground">{point.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-secondary" />
              Clarity
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-sm bg-primary" />
              Assertiveness
            </span>
          </div>
        </Card>
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

function Skill({ label, value }: { label: string; value: number }) {
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
