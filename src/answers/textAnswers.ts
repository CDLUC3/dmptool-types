import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Text Based Question Types

export const EmailAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('email'),
  answer: z.string().default('')
}));

export const TextAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('text'),
  answer: z.string().default('')
}));

export const TextAreaAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('textArea'),
  answer: z.string().default('')
}));

export const URLAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('url'),
  answer: z.string().default('')
}));

// This will ensure that object validations are against the Zod schemas defined above
export type EmailAnswerType = z.infer<typeof EmailAnswerSchema>;
export type TextAnswerType = z.infer<typeof TextAnswerSchema>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswerSchema>;
export type URLAnswerType = z.infer<typeof URLAnswerSchema>;
