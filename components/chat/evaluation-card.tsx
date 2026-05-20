import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { CommunicationEvaluation } from '@/lib/ai/evaluation-schema';

const scoreLabels = ['confidence', 'clarity', 'empathy', 'assertiveness'] as const;

export function EvaluationCard({ evaluation }: { evaluation: CommunicationEvaluation }) {
  return (
    <Card className="border-primary/20 bg-card/95 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Coaching feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {scoreLabels.map((label) => (
            <div key={label} className="space-y-2">
              <div className="flex justify-between text-sm capitalize">
                <span>{label}</span>
                <span className="font-medium">{evaluation[label]}</span>
              </div>
              <Progress value={evaluation[label]} />
            </div>
          ))}
        </div>
        <FeedbackList title="Strengths" items={evaluation.strengths} />
        <FeedbackList title="Try next" items={evaluation.improvements} />
        {(evaluation.passiveLanguageExamples.length > 0 ||
          evaluation.aggressiveLanguageExamples.length > 0) && (
          <div className="rounded-lg bg-muted/60 p-4 text-sm">
            <p className="font-medium">Language patterns noticed</p>
            <FeedbackList
              title="Passive signals"
              items={evaluation.passiveLanguageExamples}
              compact
            />
            <FeedbackList
              title="Aggressive signals"
              items={evaluation.aggressiveLanguageExamples}
              compact
            />
          </div>
        )}
        {evaluation.suggestedRewrite ? (
          <div className="rounded-lg border bg-background/70 p-4">
            <p className="mb-2 text-sm font-medium">Suggested rewrite</p>
            <p className="text-sm leading-6 text-muted-foreground">{evaluation.suggestedRewrite}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function FeedbackList({
  title,
  items,
  compact
}: {
  title: string;
  items: string[];
  compact?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div className={compact ? 'mt-3' : ''}>
      <p className="mb-2 text-sm font-medium">{title}</p>
      <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
