import { z } from "zod";
import { QuestionSchema } from "./question";

// A select box, radio buttons, or checkboxes option
const OptionSchema = z.object({
  label: z.string(),                                      // The label of the option
  value: z.string(),                                      // The value of the option
});

const BaseAttributes = QuestionSchema.shape.attributes;

const CheckedOptionSchema = OptionSchema.merge(z.object({
  checked: z.boolean().optional(),
}));

const SelectedOptionSchema = OptionSchema.merge(z.object({
  selected: z.boolean().optional(),
}));

export const BooleanQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('boolean'),
  attributes: BaseAttributes.unwrap().merge(z.object({
    checked: z.boolean().optional(),
  })),
}));

// Check boxes question and answer
export const CheckboxesQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('checkBoxes'),                            // The type of question
  options: z.array(CheckedOptionSchema)
}));

// Radio buttons question and answer
export const RadioButtonsQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('radioButtons'),                          // The type of question
  options: z.array(SelectedOptionSchema)
}));

// Select box question and answer
export const SelectBoxQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('selectBox'),                             // The type of question
  options: z.array(SelectedOptionSchema),
  attributes: BaseAttributes.unwrap().merge(z.object({
    multiple: z.boolean().optional()                        // Whether to allow multiple selections (default is false)
  })).optional()
}));

// This will ensure that object validations are against the Zod schemas defined above
export type BooleanQuestionType = z.infer<typeof BooleanQuestionSchema>;
export type CheckboxesQuestionType = z.infer<typeof CheckboxesQuestionSchema>;
export type RadioButtonsQuestionType = z.infer<typeof RadioButtonsQuestionSchema>;
export type SelectBoxQuestionType = z.infer<typeof SelectBoxQuestionSchema>;
