import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, generateObject, type Message } from "ai";
import { evaluationSchema } from "@/lib/ai/evaluation-schema";
import { buildEvaluationPrompt, feedbackSystemPrompt } from "@/lib/ai/prompts";
import { getScenario } from "@/lib/ai/scenarios";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, scenarioId } = (await req.json()) as {
    messages: Message[];
    scenarioId: string;
  };

  const scenario = getScenario(scenarioId);

  if (!scenario) {
    return Response.json({ error: "Scenario not found" }, { status: 404 });
  }

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    system: feedbackSystemPrompt,
    prompt: buildEvaluationPrompt(convertToCoreMessages(messages), scenario),
    schema: evaluationSchema
  });

  return Response.json(object);
}
