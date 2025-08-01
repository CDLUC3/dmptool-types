import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to Option Based Question Types
export const BooleanAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('boolean'),
  answer: z.boolean().default(false)
}));

export const CheckboxesAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('checkBoxes'),
  answer: z.array(z.string()).default([''])
}));

export const RadioButtonsAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('radioButtons'),
  answer: z.string().default('')
}));

export const SelectBoxAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('selectBox'),
  answer: z.string().default('')
}));

export const MultiselectBoxAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('multiselectBox'),
  answer: z.array(z.string()).default([''])
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanAnswerType = z.infer<typeof BooleanAnswerSchema>;
export type CheckboxesAnswerType = z.infer<typeof CheckboxesAnswerSchema>;
export type RadioButtonsAnswerType = z.infer<typeof RadioButtonsAnswerSchema>;
export type SelectBoxAnswerType = z.infer<typeof SelectBoxAnswerSchema>;
export type MultiselectBoxAnswerType = z.infer<typeof MultiselectBoxAnswerSchema>;
