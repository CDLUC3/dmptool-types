import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to Number Question Types

export const CurrencyAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('currency'),
  answer: z.number().default(0),
  comment: z.string().optional().default('')
});
export const DefaultCurrencyAnswer = CurrencyAnswerSchema.parse({
  type: 'currency',
  answer: 0,
  meta: DefaultMeta,
  comment: ''
});

export const NumberAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('number'),
  answer: z.number().default(0),
  comment: z.string().optional().default('')
});
export const DefaultNumberAnswer = NumberAnswerSchema.parse({
  type: 'number',
  answer: 0,
  meta: DefaultMeta,
  comment: ''
});

export const NumberRangeAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('numberRange'),
  answer: z.object({
    start: z.number().default(0),                        // The start number
    end: z.number() .default(0)                          // The end number
  }),
  comment: z.string().optional().default('')
});
export const DefaultNumberRangeAnswer = NumberRangeAnswerSchema.parse({
  type: 'numberRange',
  answer: {
    start: 0,
    end: 0
  },
  meta: DefaultMeta,
  comment: ''
});

export const NumberWithContextAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('numberWithContext'),
  answer: z.object ({
    value: z.number().default(0),
    context: z.string().default('')                       // Additional context for the number
  }),
  comment: z.string().optional().default('')
});
export const DefaultNumberWithContextAnswer = NumberWithContextAnswerSchema.parse({
  type: 'numberWithContext',
  answer: {
    value: 0,
    context: ''
  },
  meta: DefaultMeta,
  comment: ''
});

// This will ensure that object validations are against the Zod schemas defined above
export type CurrencyAnswerType = z.infer<typeof CurrencyAnswerSchema>;
export type NumberAnswerType = z.infer<typeof NumberAnswerSchema>;
export type NumberRangeAnswerType = z.infer<typeof NumberRangeAnswerSchema>;
export type NumberWithContextAnswerType = z.infer<typeof NumberWithContextAnswerSchema>;

export const CurrencyAnswerJSONSchema = z.toJSONSchema(CurrencyAnswerSchema);
export const NumberAnswerJSONSchema = z.toJSONSchema(NumberAnswerSchema);
export const NumberRangeAnswerJSONSchema = z.toJSONSchema(NumberRangeAnswerSchema);
export const NumberWithContextAnswerJSONSchema = z.toJSONSchema(NumberWithContextAnswerSchema);
