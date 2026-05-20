'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, SquareCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChatMessage } from '@/components/chat/chat-message';
import { TypingIndicator } from '@/components/chat/streaming-message';
import { EvaluationCard } from '@/components/chat/evaluation-card';
import { PersonalityBadge } from '@/components/chat/personality-badge';
import type { CommunicationEvaluation } from '@/lib/ai/evaluation-schema';
import type { Scenario } from '@/lib/ai/scenarios';

export function ConversationPanel({ scenario }: { scenario: Scenario }) {
  const [evaluation, setEvaluation] = useState<CommunicationEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const initialMessage = useMemo(
    () => ({
      id: 'opening',
      role: 'assistant' as const,
      content: openingForScenario(scenario.id)
    }),
    [scenario.id]
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
    body: { scenarioId: scenario.id },
    initialMessages: [initialMessage]
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, evaluation]);

  const readyForFeedback = messages.some((message) =>
    String(message.content).includes('[READY_FOR_FEEDBACK]')
  );

  async function evaluateSession() {
    setIsEvaluating(true);
    const response = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenarioId: scenario.id,
        messages: messages.map(({ role, content }) => ({ role, content }))
      })
    });
    const result = (await response.json()) as CommunicationEvaluation;
    setEvaluation(result);
    setIsEvaluating(false);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <Card className="flex min-h-[72vh] flex-col overflow-hidden bg-background/62 shadow-soft">
        <div className="border-b bg-card/72 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Roleplay with</p>
              <h1 className="text-xl font-semibold">{scenario.role}</h1>
            </div>
            <PersonalityBadge>{scenario.difficulty}</PersonalityBadge>
          </div>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={String(message.content)} />
          ))}
          {isLoading ? <TypingIndicator /> : null}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={handleSubmit} className="border-t bg-card/72 p-3">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Respond as you naturally would..."
              className="min-h-12 flex-1 resize-none rounded-md border bg-background px-3 py-3 text-sm outline-none ring-ring transition focus:ring-2"
              rows={1}
            />
            <Button type="submit" size="lg" disabled={isLoading || !input.trim()} aria-label="Send">
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </Card>

      <aside className="space-y-4">
        <Card className="p-5">
          <p className="mb-2 text-sm font-medium">Practice focus</p>
          <p className="text-sm leading-6 text-muted-foreground">{scenario.context}</p>
          <div className="mt-4 space-y-2">
            {scenario.goals.map((goal) => (
              <div key={goal} className="rounded-md bg-muted/65 px-3 py-2 text-sm">
                {goal}
              </div>
            ))}
          </div>
        </Card>
        <Button
          className="w-full"
          variant={readyForFeedback ? 'default' : 'secondary'}
          disabled={isEvaluating || messages.length < 4}
          onClick={evaluateSession}
        >
          <SquareCheckBig className="size-4" />
          {isEvaluating ? 'Reading the conversation...' : 'Get coaching feedback'}
        </Button>
        {evaluation ? <EvaluationCard evaluation={evaluation} /> : null}
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            append({
              role: 'user',
              content: "Let's pause the roleplay here and move toward feedback."
            })
          }
        >
          End scene naturally
        </Button>
      </aside>
    </div>
  );
}

function openingForScenario(id: string) {
  const openings: Record<string, string> = {
    'extra-work':
      'Hey, quick thing. I need you to take on the client update today. I know you have other work, but this really cannot wait.',
    'friend-boundaries':
      'I saw you did not answer last night. I guess I thought we were closer than that.',
    'passive-aggressive-coworker':
      'Some people seem to disappear when the details matter, but sure, we can pretend the timeline slipped by itself.',
    'relationship-respect':
      'I am just saying, if you actually listened the first time, I would not have to repeat myself.',
    'restaurant-return': 'Everything okay over here?',
    'salary-negotiation':
      'We are excited about you. The offer is $92,000, and we would love to get your answer this week.',
    'manipulative-communication':
      'After everything I have done, I honestly cannot believe you would say no to this.'
  };

  return openings[id] ?? 'Thanks for talking. I want to bring something up directly.';
}
