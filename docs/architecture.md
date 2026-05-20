# Human Skills Architecture

## MVP Scope

The first module is Assertiveness Training only. The app avoids therapy, diagnosis, or treatment framing and stays focused on communication coaching, interpersonal skill development, and realistic practice.

## Folder Structure

- `app/`: Next.js App Router pages and route handlers.
- `app/api/chat/route.ts`: Vercel AI SDK streaming roleplay endpoint.
- `app/api/evaluate/route.ts`: structured JSON evaluation endpoint.
- `components/chat/`: conversation UI, typing state, markdown messages, feedback cards.
- `components/scenarios/`: scenario selection components.
- `components/ui/`: shadcn/ui-style primitives used by the app.
- `lib/ai/`: reusable prompt architecture, scenarios, and evaluation schema.
- `lib/db/`: Prisma client singleton.
- `lib/store/`: lightweight Zustand local state.
- `prisma/schema.prisma`: SQLite-backed session and progress models.

## AI Architecture

The AI layer is intentionally small and composable:

- `scenarios.ts` contains scenario metadata, role, personality, difficulty, and practice goals.
- `prompts.ts` builds roleplay system prompts from scenario config.
- `evaluation-schema.ts` defines the structured coaching output contract with Zod.
- `/api/chat` streams in-character responses using `streamText`.
- `/api/evaluate` returns structured JSON using `generateObject`.

This keeps prompts auditable and lets future modules reuse the same roleplay and feedback patterns.

## Evaluation Contract

```json
{
  "confidence": 0,
  "clarity": 0,
  "empathy": 0,
  "assertiveness": 0,
  "passiveLanguageExamples": [],
  "aggressiveLanguageExamples": [],
  "strengths": [],
  "improvements": [],
  "suggestedRewrite": "optional"
}
```

## MVP Implementation Plan

1. Build the assertiveness scenario library.
2. Stream realistic roleplay responses with adaptive escalation and de-escalation.
3. Provide manual session-end evaluation with structured JSON feedback.
4. Persist completed sessions to Prisma once auth/user identity is introduced.
5. Replace mock dashboard/history/progress data with saved session analytics.
6. Add scenario difficulty tuning and post-session replay.

## Design Decisions

- Mobile-first layout keeps practice accessible and intimate.
- Warm muted colors, rounded-but-contained cards, and generous spacing create calm without looking clinical.
- Chat is framed as roleplay simulation, not a generic assistant conversation.
- Evaluation uses scored dimensions plus examples and rewrites so feedback is specific and actionable.
