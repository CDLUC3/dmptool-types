import { z } from "zod";
import {
  BaseAttributesSchema,
  DefaultMeta,
  QuestionSchema
} from "./question";

// A select box, radio buttons, or checkboxes option
const OptionSchema = z.object({
  label: z.string().default('Option A'),
  value: z.string().default('a'),
});

const CheckedOptionSchema = z.object({
  ...OptionSchema.shape,
  checked: z.boolean().default(false),
});
const DefaultCheckedOption = CheckedOptionSchema.parse({});

const SelectedOptionSchema = z.object({
  ...OptionSchema.shape,
  selected: z.boolean().default(false),
});
const DefaultSelectedOption = SelectedOptionSchema.parse({});

const selectBoxAttributes = z.object({
  ...BaseAttributesSchema.shape,
  multiple: z.literal(false)
});
const DefaultSelectBoxAttributes = selectBoxAttributes.parse({
  multiple: false
});

// Yes/No (boolean) question
export const BooleanQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('boolean'),
  options: z.array(SelectedOptionSchema).min(2).max(2)
});
export const DefaultBooleanQuestion = BooleanQuestionSchema.parse({
  type: 'boolean',
  attributes: { label: "Yes or no" },
  meta: DefaultMeta,
  options: [
    { label: 'Yes', value: 'yes', selected: false },
    { label: 'No', value: 'no', selected: false }
  ]
});

// Check boxes question and answer
export const CheckboxesQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('checkBoxes'),
  options: z.array(CheckedOptionSchema),
});
export const DefaultCheckboxesQuestion = CheckboxesQuestionSchema.parse({
  type: 'checkBoxes',
  attributes: CheckedOptionSchema,
  meta: DefaultMeta,
  options: [DefaultCheckedOption]
});

// Radio buttons question and answer
export const RadioButtonsQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('radioButtons'),
  options: z.array(SelectedOptionSchema),
});
export const DefaultRadioButtonsQuestion = RadioButtonsQuestionSchema.parse({
  type: 'radioButtons',
  attributes: DefaultSelectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultSelectedOption]
});

// Select box question and answer
export const SelectBoxQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('selectBox'),
  options: z.array(SelectedOptionSchema),
  attributes: selectBoxAttributes
});
export const DefaultSelectBoxQuestion = SelectBoxQuestionSchema.parse({
  type: 'selectBox',
  attributes: DefaultSelectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultSelectedOption]
});

const multiselectBoxAttributes = z.object({
  ...selectBoxAttributes.shape,
  multiple: z.literal(true)
});
const DefaultMultiselectBoxAttributes = multiselectBoxAttributes.parse({
  multiple: true
});

// Multi-select box question and answer
export const MultiselectBoxQuestionSchema = z.object({
  ...SelectBoxQuestionSchema.shape,
  type: z.literal('multiselectBox'),
  options: z.array(SelectedOptionSchema),
  attributes: multiselectBoxAttributes
});
export const DefaultMultiselectBoxQuestion = MultiselectBoxQuestionSchema.parse({
  type: 'multiselectBox',
  attributes: DefaultMultiselectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultSelectedOption]
});

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanQuestionType = z.infer<typeof BooleanQuestionSchema>;
export type CheckboxesQuestionType = z.infer<typeof CheckboxesQuestionSchema>;
export type RadioButtonsQuestionType = z.infer<typeof RadioButtonsQuestionSchema>;
export type SelectBoxQuestionType = z.infer<typeof SelectBoxQuestionSchema>;
export type MultiselectBoxQuestionType = z.infer<typeof MultiselectBoxQuestionSchema>;

export const BooleanQuestionJSONSchema = z.toJSONSchema(BooleanQuestionSchema);
export const CheckboxesQuestionJSONSchema = z.toJSONSchema(CheckboxesQuestionSchema);
export const RadioButtonsQuestionJSONSchema = z.toJSONSchema(RadioButtonsQuestionSchema);
export const SelectBoxQuestionJSONSchema = z.toJSONSchema(SelectBoxQuestionSchema);
export const MultiselectBoxQuestionJSONSchema = z.toJSONSchema(MultiselectBoxQuestionSchema);
