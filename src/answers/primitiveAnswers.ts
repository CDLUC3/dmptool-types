import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Primitive Question Types

export const BooleanAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('boolean'),                                 // The type of answer
  answer: z.boolean()                                         // The answer to the question (true/false)
}));

export const CurrencyAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('currency'),                                // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const EmailAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('email'),                                   // The type of question
  answer: z.string()                                          // The answer to the question (string)
}));

export const NumberAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('number'),                                  // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const TextAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('text'),                                  // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

export const TextAreaAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('textArea'),                                // The type of answer
  answer: z.string()                                          // The answer to the question (string)
}));

export const URLAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('url'),                                   // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanAnswerType = z.infer<typeof BooleanAnswerSchema>;
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswerSchema>;
export type EmailAnswerType = z.infer<typeof EmailAnswerSchema>;
export type NumberAnswerType = z.infer<typeof NumberAnswerSchema>;
export type TextAnswerType = z.infer<typeof TextAnswerSchema>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswerSchema>;
export type URLAnswerType = z.infer<typeof URLAnswerSchema>;
