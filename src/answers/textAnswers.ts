import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Text Based Question Types

export const EmailAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('email'),                                 // The type of question
  answer: z.string()                                        // The answer to the question (string)
}));

export const TextAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('text'),                                  // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

export const TextAreaAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('textArea'),                              // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

export const URLAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('url'),                                   // The type of answer
  answer: z.string()                                        // The answer to the question (string)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type EmailAnswerType = z.infer<typeof EmailAnswerSchema>;
export type TextAnswerType = z.infer<typeof TextAnswerSchema>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswerSchema>;
export type URLAnswerType = z.infer<typeof URLAnswerSchema>;
