import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Date Question Types

export const DateAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('date'),
  answer: z.string().default('')
}));

export const DateRangeAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('dateRange'),
  answer: z.object({
    start: z.string().default(''),           // The start date (string)
    end: z.string().default('')              // The end date (string)
  }).default({})
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DateAnswerType = z.infer<typeof DateAnswerSchema>;
export type DateRangeAnswerType = z.infer<typeof DateRangeAnswerSchema>;
