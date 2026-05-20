"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scenarioIcons, type Scenario } from "@/lib/ai/scenarios";
import { useSessionStore } from "@/lib/store/session-store";

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const Icon = scenarioIcons[scenario.iconName];
  const setScenario = useSessionStore((state) => state.setScenario);

  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
          <span className="grid size-11 place-items-center rounded-lg bg-secondary/55">
            <Icon className="size-5 text-calm-ink" />
          </span>
          <Badge>{scenario.difficulty}</Badge>
        </div>
        <CardTitle className="leading-snug">{scenario.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">{scenario.summary}</p>
        <div className="flex flex-wrap gap-2">
          {scenario.goals.slice(0, 2).map((goal) => (
            <Badge key={goal} className="bg-muted/70">
              {goal}
            </Badge>
          ))}
        </div>
        <Button asChild className="w-full" onClick={() => setScenario(scenario.id)}>
          <Link href={`/session/${scenario.id}`}>
            Practice
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
