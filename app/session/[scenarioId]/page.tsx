import { notFound } from "next/navigation";
import { ConversationPanel } from "@/components/chat/conversation-panel";
import { getScenario } from "@/lib/ai/scenarios";

export default async function SessionPage({
  params
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = getScenario(scenarioId);

  if (!scenario) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-28 md:py-8">
      <ConversationPanel scenario={scenario} />
    </div>
  );
}
