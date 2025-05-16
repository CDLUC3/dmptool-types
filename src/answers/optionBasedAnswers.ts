import { z } from 'zod';
import { Answer } from './answer';

// Answers to Option Based Question Types

export const CheckboxesAnswer = Answer.merge(z.object({
  type: z.literal('checkBoxes'),                              // The type of answer
  answer: z.array(z.string())                                 // The answer to the question (array of strings)
}));

export const RadioButtonsAnswer = Answer.merge(z.object({
  type: z.literal('radioButtons'),                            // The type of answer
  answer: z.string()                                          // The answer to the question (string)
}));

export const SelectBoxAnswer = Answer.merge(z.object({
  type: z.literal('selectBox'),                               // The type of answer
  answer: z.string()                                          // The answer to the question (string)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type CheckboxesAnswerType = z.infer<typeof CheckboxesAnswer>;
export type RadioButtonsAnswerType = z.infer<typeof RadioButtonsAnswer>;
export type SelectBoxAnswerType = z.infer<typeof SelectBoxAnswer>;
