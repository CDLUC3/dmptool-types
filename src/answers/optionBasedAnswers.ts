import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to Option Based Question Types
export const BooleanAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('boolean'),
  answer: z.boolean().default(false)
});
export const DefaultBooleanAnswer = BooleanAnswerSchema.parse({
  type: 'boolean',
  answer: false,
  meta: DefaultMeta
});

export const CheckboxesAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('checkBoxes'),
  answer: z.array(z.string()).default([''])
});
export const DefaultCheckboxesAnswer = CheckboxesAnswerSchema.parse({
  type: 'checkBoxes',
  answer: [],
  meta: DefaultMeta
});

export const RadioButtonsAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('radioButtons'),
  answer: z.string().default('')
});
export const DefaultRadioButtonsAnswer = RadioButtonsAnswerSchema.parse({
  type: 'radioButtons',
  answer: '',
  meta: DefaultMeta
});

export const SelectBoxAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('selectBox'),
  answer: z.string().default('')
});
export const DefaultSelectBoxAnswer = SelectBoxAnswerSchema.parse({
  type: 'selectBox',
  answer: '',
  meta: DefaultMeta
});

export const MultiselectBoxAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('multiselectBox'),
  answer: z.array(z.string()).default([''])
});
export const DefaultMultiselectBoxAnswer = MultiselectBoxAnswerSchema.parse({
  type: 'multiselectBox',
  answer: [],
  meta: DefaultMeta
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
