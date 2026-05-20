import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const timeline = [
  { label: 'Week 1', clarity: 58, assertiveness: 52 },
  { label: 'Week 2', clarity: 66, assertiveness: 61 },
  { label: 'Week 3', clarity: 72, assertiveness: 68 },
  { label: 'Week 4', clarity: 78, assertiveness: 74 }
];

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Progress</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Track communication skill development over repeated practice sessions.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-[380px_1fr]">
        <Card className="p-5">
          <h2 className="font-semibold">Current average</h2>
          <div className="mt-5 space-y-5">
            <Skill label="Confidence" value={76} />
            <Skill label="Clarity" value={78} />
            <Skill label="Empathy" value={83} />
            <Skill label="Assertiveness" value={74} />
          </div>
        </Card>
        <Card className="p-5">
          <h2 className="font-semibold">Progress timeline</h2>
          <div className="mt-6 grid h-72 grid-cols-4 items-end gap-4">
            {timeline.map((point) => (
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
