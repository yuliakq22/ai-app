# Human Skills

Human Skills is an AI-powered communication coaching app for interactive roleplay simulations. The MVP focuses on assertiveness training: users choose a scenario, practice a realistic conversation, and receive structured coaching feedback.

## Stack

- Next.js App Router
- TypeScript
- Vercel AI SDK
- Tailwind CSS
- shadcn/ui-style primitives
- Zustand local state
- Prisma + SQLite

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run dev
```

Set `OPENAI_API_KEY` in `.env.local` for streaming AI responses.
