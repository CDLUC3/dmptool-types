import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to Option Based Question Types
export const BooleanAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('boolean'),
  answer: z.boolean().default(false),
  comment: z.string().optional().default('')
});
export const DefaultBooleanAnswer = BooleanAnswerSchema.parse({
  type: 'boolean',
  answer: false,
  meta: DefaultMeta,
  commnent: ''
});

export const CheckboxesAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('checkBoxes'),
  answer: z.array(z.string()).default(['']),
  comment: z.string().optional().default('')
});
export const DefaultCheckboxesAnswer = CheckboxesAnswerSchema.parse({
  type: 'checkBoxes',
  answer: [],
  meta: DefaultMeta,
  comment: ''
});

export const RadioButtonsAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('radioButtons'),
  answer: z.string().default(''),
  comment: z.string().optional().default('')
});
export const DefaultRadioButtonsAnswer = RadioButtonsAnswerSchema.parse({
  type: 'radioButtons',
  answer: '',
  meta: DefaultMeta,
  comment: ''
});

export const SelectBoxAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('selectBox'),
  answer: z.string().default(''),
  comment: z.string().optional().default('')
});
export const DefaultSelectBoxAnswer = SelectBoxAnswerSchema.parse({
  type: 'selectBox',
  answer: '',
  meta: DefaultMeta,
  comment: ''
});

export const MultiselectBoxAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('multiselectBox'),
  answer: z.array(z.string()).default(['']),
  comment: z.string().optional().default('')
});
export const DefaultMultiselectBoxAnswer = MultiselectBoxAnswerSchema.parse({
  type: 'multiselectBox',
  answer: [],
  meta: DefaultMeta,
  comment: ''
});

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanAnswerType = z.infer<typeof BooleanAnswerSchema>;
export type CheckboxesAnswerType = z.infer<typeof CheckboxesAnswerSchema>;
export type RadioButtonsAnswerType = z.infer<typeof RadioButtonsAnswerSchema>;
export type SelectBoxAnswerType = z.infer<typeof SelectBoxAnswerSchema>;
export type MultiselectBoxAnswerType = z.infer<typeof MultiselectBoxAnswerSchema>;

export const BooleanAnswerJSONSchema = z.toJSONSchema(BooleanAnswerSchema);
export const CheckboxesAnswerJSONSchema = z.toJSONSchema(CheckboxesAnswerSchema);
export const RadioButtonsAnswerJSONSchema = z.toJSONSchema(RadioButtonsAnswerSchema);
export const SelectBoxAnswerJSONSchema = z.toJSONSchema(SelectBoxAnswerSchema);
export const MultiselectBoxAnswerJSONSchema = z.toJSONSchema(MultiselectBoxAnswerSchema);
