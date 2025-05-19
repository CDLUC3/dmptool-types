import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Date Question Types

export const DatePickerAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('datePicker'),                              // The type of question
}));

export const DateRangeAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('dateRange'),                               // The type of answer
  answer: z.object({
    start: z.string(),                                        // The start date (string)
    end: z.string()                                           // The end date (string)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type DatePickerAnswerType = z.infer<typeof DatePickerAnswerSchema>;
export type DateRangeAnswerType = z.infer<typeof DateRangeAnswerSchema>;
