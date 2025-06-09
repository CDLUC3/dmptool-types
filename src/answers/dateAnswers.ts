import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Date Question Types

export const DateAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('date'),                                    // The type of question
}));

export const DateRangeAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('dateRange'),                               // The type of answer
  answer: z.object({
    start: z.string(),                                        // The start date (string)
    end: z.string()                                           // The end date (string)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DateAnswerType = z.infer<typeof DateAnswerSchema>;
export type DateRangeAnswerType = z.infer<typeof DateRangeAnswerSchema>;
