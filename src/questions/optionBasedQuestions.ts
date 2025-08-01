import { z } from "zod";
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

// A select box, radio buttons, or checkboxes option
const OptionSchema = z.object({
  label: z.string().default('Option A'),
  value: z.string().default('a'),
});

const CheckedOptionSchema = OptionSchema.merge(z.object({
  checked: z.boolean().default(false),
}));

const SelectedOptionSchema = OptionSchema.merge(z.object({
  selected: z.boolean().default(false),
}));

const selectBoxAttributes = BaseAttributes.merge(z.object({
  multiple: z.boolean().default(false)
}));

// Yes/No (boolean) question
export const BooleanQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('boolean'),
  attributes: BaseAttributes.merge(z.object({
    checked: z.boolean().default(false),
  })).default({})
}));

// Check boxes question and answer
export const CheckboxesQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('checkBoxes'),
  options: z.array(CheckedOptionSchema).default([{}]),
  attributes: BaseAttributes.default({}),
}));

// Radio buttons question and answer
export const RadioButtonsQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('radioButtons'),
  options: z.array(SelectedOptionSchema).default([{}]),
  attributes: BaseAttributes.default({})
}));

// Select box question and answer
export const SelectBoxQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('selectBox'),
  options: z.array(SelectedOptionSchema).default([{}]),
  attributes: selectBoxAttributes.merge(z.object({
    multiple: z.literal(false)
  })).default({ multiple: false })
}));

// Multi-select box question and answer
export const MultiselectBoxQuestionSchema = SelectBoxQuestionSchema.merge(z.object({
  type: z.literal('multiselectBox'),
  options: z.array(SelectedOptionSchema).default([{}]),
  attributes: selectBoxAttributes.merge(z.object({
    multiple: z.literal(true)
  })).default({ multiple: true })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanQuestionType = z.infer<typeof BooleanQuestionSchema>;
export type CheckboxesQuestionType = z.infer<typeof CheckboxesQuestionSchema>;
export type RadioButtonsQuestionType = z.infer<typeof RadioButtonsQuestionSchema>;
export type SelectBoxQuestionType = z.infer<typeof SelectBoxQuestionSchema>;
export type MultiselectBoxQuestionType = z.infer<typeof MultiselectBoxQuestionSchema>;
