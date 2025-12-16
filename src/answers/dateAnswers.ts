import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to Date Question Types

export const DateAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('date'),
  answer: z.string().default('')
});
export const DefaultDateAnswer = DateAnswerSchema.parse({
  type: 'date',
  answer: '',
  meta: DefaultMeta
});

export const DateRangeAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('dateRange'),
  answer: z.object({
    start: z.string().default(''),           // The start date (string)
    end: z.string().default('')              // The end date (string)
  })
});
export const DefaultDateRangeAnswer = DateRangeAnswerSchema.parse({
  type: 'dateRange',
  answer: {
    start: '',
    end: ''
  },
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type DateAnswerType = z.infer<typeof DateAnswerSchema>;
export type DateRangeAnswerType = z.infer<typeof DateRangeAnswerSchema>;

export const DateAnswerJSONSchema = z.toJSONSchema(DateAnswerSchema);
export const DateRangeAnswerJSONSchema = z.toJSONSchema(DateRangeAnswerSchema);
