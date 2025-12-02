import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Number Question Types

export const CurrencyAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('currency'),
  answer: z.number().default(0)
}));

export const NumberAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('number'),
  answer: z.number().default(0)
}));

export const NumberRangeAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('numberRange'),
  answer: z.object({
    start: z.number().default(0),                        // The start number
    end: z.number() .default(0)                          // The end number
  }).default({})
}));

export const NumberWithContextAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('numberWithContext'),
  answer: z.object ({
    value: z.number().default(0),
    context: z.string().default('')                       // Additional context for the number
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswerSchema>;
export type NumberAnswerType = z.infer<typeof NumberAnswerSchema>;
export type NumberRangeAnswerType = z.infer<typeof NumberRangeAnswerSchema>;
export type NumberWithContextAnswerType = z.infer<typeof NumberWithContextAnswerSchema>;
