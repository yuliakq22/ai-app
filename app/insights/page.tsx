import { Card } from '@/components/ui/card';
import { demoEmotionFrequency, demoPatterns } from '@/lib/demo/eq-coach-demo-data';

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Insights</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Demo-backed views for emotional frequency, recurring patterns, and future progress
        reflections.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_380px]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Emotion frequency</h2>
            <DemoLabel />
          </div>
          <div className="mt-6 space-y-4">
            {demoEmotionFrequency.map((emotion) => (
              <div key={emotion.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{emotion.label}</span>
                  <span className="text-muted-foreground">{emotion.value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${emotion.value * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Pattern tracker</h2>
            <DemoLabel />
          </div>
          <div className="mt-5 space-y-3">
            {demoPatterns.map((pattern) => (
              <div key={pattern.name} className="rounded-md bg-muted/60 p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{pattern.name}</p>
                  <span className="text-sm text-muted-foreground">{pattern.frequency} times</span>
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
          <h2 className="font-semibold">Monthly reflection</h2>
          <DemoLabel />
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
          Over the past month, your most common emotional trigger has been work-related overwhelm.
          Recent sessions show more precision in naming emotions, moving from broad words like
          stressed toward more specific labels like guilt, resentment, and anticipatory anxiety.
        </p>
      </Card>
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
