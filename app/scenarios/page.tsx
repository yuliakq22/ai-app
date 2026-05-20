import { ScenarioCard } from '@/components/scenarios/scenario-card';
import { assertivenessScenarios } from '@/lib/ai/scenarios';

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-28 md:py-12">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Assertiveness module
        </p>
        <h1 className="mt-2 font-serif text-4xl">Choose a practice scenario</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pick one situation and practice the conversation in a focused, realistic roleplay.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {assertivenessScenarios.map((scenario) => (
          <ScenarioCard key={scenario.id} scenario={scenario} />
        ))}
      </div>
    </div>
  );
}
