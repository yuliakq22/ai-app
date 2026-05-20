import { z } from 'zod';

export const evaluationSchema = z.object({
  confidence: z.number().min(0).max(100),
  clarity: z.number().min(0).max(100),
  empathy: z.number().min(0).max(100),
  assertiveness: z.number().min(0).max(100),
  passiveLanguageExamples: z.array(z.string()),
  aggressiveLanguageExamples: z.array(z.string()),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  suggestedRewrite: z.string().optional()
});

export type CommunicationEvaluation = z.infer<typeof evaluationSchema>;
