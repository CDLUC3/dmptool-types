import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Number Question Types

export const BooleanAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('boolean'),                                 // The type of answer
  answer: z.boolean()                                         // The answer to the question (true/false)
}));

export const CurrencyAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('currency'),                                // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const NumberAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('number'),                                  // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const NumberRangeAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('numberRange'),                             // The type of answer
  answer: z.object({
    start: z.number(),                                        // The start number (number)
    end: z.number()                                           // The end number (number)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanAnswerType = z.infer<typeof BooleanAnswerSchema>;
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswerSchema>;
export type NumberAnswerType = z.infer<typeof NumberAnswerSchema>;
export type NumberRangeAnswerType = z.infer<typeof NumberRangeAnswerSchema>;
