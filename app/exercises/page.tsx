import { Card } from '@/components/ui/card';
import { demoExercises } from '@/lib/demo/eq-coach-demo-data';

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <h1 className="font-serif text-4xl">Exercise library</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Browse starter exercises. Later this page will read from Supabase and power retrieval for
        coaching sessions.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {['All', 'CBT', 'NVC', 'ACT', 'DBT', 'Anxiety', 'Overwhelm'].map((filter) => (
          <button
            key={filter}
            className="rounded-full border bg-background/70 px-3 py-1.5 text-sm text-muted-foreground"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {demoExercises.map((exercise) => (
          <Card key={exercise.name} className="p-5">
            <exercise.icon className="mb-4 size-6 text-primary" />
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">{exercise.name}</h2>
              <span className="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                {exercise.framework}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{exercise.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {exercise.emotions.map((emotion) => (
                <span
                  key={emotion}
                  className="rounded-full border bg-muted/70 px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {emotion}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
