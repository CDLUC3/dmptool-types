import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to Text Based Question Types

export const EmailAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('email'),
  answer: z.string().default('')
});
export const DefaultEmailAnswer = EmailAnswerSchema.parse({
  type: 'email',
  answer: '',
  meta: DefaultMeta
});

export const TextAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('text'),
  answer: z.string().default('')
});
export const DefaultTextAnswer = TextAnswerSchema.parse({
  type: 'text',
  answer: '',
  meta: DefaultMeta
});

export const TextAreaAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('textArea'),
  answer: z.string().default('')
});
export const DefaultTextAreaAnswer = TextAreaAnswerSchema.parse({
  type: 'textArea',
  answer: '',
  meta: DefaultMeta
});

export const URLAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('url'),
  answer: z.string().default('')
});
export const DefaultURLAnswer = URLAnswerSchema.parse({
  type: 'url',
  answer: '',
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type EmailAnswerType = z.infer<typeof EmailAnswerSchema>;
export type TextAnswerType = z.infer<typeof TextAnswerSchema>;
export type TextAreaAnswerType = z.infer<typeof TextAreaAnswerSchema>;
export type URLAnswerType = z.infer<typeof URLAnswerSchema>;

export const EmailAnswerJSONSchema = z.toJSONSchema(EmailAnswerSchema);
export const TextAnswerJSONSchema = z.toJSONSchema(TextAnswerSchema);
export const TextAreaAnswerJSONSchema = z.toJSONSchema(TextAreaAnswerSchema);
export const URLAnswerJSONSchema = z.toJSONSchema(URLAnswerSchema);
