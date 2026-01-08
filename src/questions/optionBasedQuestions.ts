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
  description: z.string().optional(),
});
const DefaultOption = OptionSchema.parse({});

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
  attributes: z.object({
    label: z.string(),
    value: z.boolean().default(false),
  }),
  showCommentField: z.boolean().optional()
});
export const DefaultBooleanQuestion = BooleanQuestionSchema.parse({
  type: 'boolean',
  attributes: {
    label: 'Is it true?',
    value: false,
  },
  meta: DefaultMeta
});

// Check boxes question and answer
export const CheckboxesQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('checkBoxes'),
  options: z.array(CheckedOptionSchema),
  showCommentField: z.boolean().optional()
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
  // Questions should not include the `selected` flag on options
  options: z.array(OptionSchema),
  showCommentField: z.boolean().optional()
});
export const DefaultRadioButtonsQuestion = RadioButtonsQuestionSchema.parse({
  type: 'radioButtons',
  attributes: DefaultSelectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultOption]
});

// Select box question and answer
export const SelectBoxQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('selectBox'),
  // Questions should not include the `selected` flag on options
  options: z.array(OptionSchema),
  attributes: selectBoxAttributes,
  showCommentField: z.boolean().optional()
});
export const DefaultSelectBoxQuestion = SelectBoxQuestionSchema.parse({
  type: 'selectBox',
  attributes: DefaultSelectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultOption]
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
  // Questions should not include the `selected` flag on options
  options: z.array(OptionSchema),
  attributes: multiselectBoxAttributes,
  showCommentField: z.boolean().optional()
});
export const DefaultMultiselectBoxQuestion = MultiselectBoxQuestionSchema.parse({
  type: 'multiselectBox',
  attributes: DefaultMultiselectBoxAttributes,
  meta: DefaultMeta,
  options: [DefaultOption]
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
