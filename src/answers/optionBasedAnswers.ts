import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Option Based Question Types

export const CheckboxesAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('checkBoxes'),                              // The type of answer
  answer: z.array(z.string())                                 // The answer to the question (array of strings)
}));

export const RadioButtonsAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('radioButtons'),                            // The type of answer
  answer: z.string()                                          // The answer to the question (string)
}));

export const SelectBoxAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('selectBox'),                               // The type of answer
  answer: z.array(z.string())                                 // The answer to the question (array of strings)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type CheckboxesAnswerType = z.infer<typeof CheckboxesAnswerSchema>;
export type RadioButtonsAnswerType = z.infer<typeof RadioButtonsAnswerSchema>;
export type SelectBoxAnswerType = z.infer<typeof SelectBoxAnswerSchema>;
