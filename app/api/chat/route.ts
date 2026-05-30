import { anthropic } from '@ai-sdk/anthropic';
import { convertToCoreMessages, streamText, type Message } from 'ai';

import { buildRoleplaySystemPrompt } from '@/lib/ai/prompts';
import { getScenario } from '@/lib/ai/scenarios';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, scenarioId } = (await req.json()) as {
    messages: Message[];
    scenarioId: string;
  };

  const scenario = getScenario(scenarioId);

  if (!scenario) {
    return Response.json({ error: 'Scenario not found' }, { status: 404 });
  }

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: buildRoleplaySystemPrompt(scenario),
    messages: convertToCoreMessages(messages),
    temperature: 0.72,
    onError({ error }) {
      console.error('[Human Skills chat stream error]', error);
    }
  });

  return result.toDataStreamResponse({
    getErrorMessage(error) {
      if (error == null) return 'Unknown AI stream error';
      if (error instanceof Error) return error.message;

      return String(error);
    }
  });
}
