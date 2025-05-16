import { z } from 'zod';
import { Answer } from './answer';

// Answers to Primitive Question Types

export const BooleanAnswer = Answer.merge(z.object({
  type: z.literal('boolean'),                                 // The type of answer
  answer: z.boolean()                                         // The answer to the question (true/false)
}));

export const CurrencyAnswer = Answer.merge(z.object({
  type: z.literal('currency'),                                // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const EmailAnswer = Answer.merge(z.object({
  type: z.literal('email'),                                   // The type of question
  answer: z.string()                                          // The answer to the question (string)
}));

export const NumberAnswer = Answer.merge(z.object({
  type: z.literal('number'),                                  // The type of answer
  answer: z.number()                                          // The answer to the question (number)
}));

export const TextAnswer = Answer.merge(z.object({
  type: z.literal('text'),                                  // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

export const TextAreaAnswer = Answer.merge(z.object({
  type: z.literal('textArea'),                                // The type of answer
  answer: z.string()                                          // The answer to the question (string)
}));

export const URLAnswer = Answer.merge(z.object({
  type: z.literal('url'),                                   // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanAnswerType = z.infer<typeof BooleanAnswer>;
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswer>;
export type EmailAnswerType = z.infer<typeof EmailAnswer>;
export type NumberAnswerType = z.infer<typeof NumberAnswer>;
export type TextAnswerType = z.infer<typeof TextAnswer>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswer>;
export type URLAnswerType = z.infer<typeof URLAnswer>;
