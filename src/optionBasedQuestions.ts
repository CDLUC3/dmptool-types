import { z } from "zod";
import { Question } from "./primitiveQuestions";

// A select box, radio buttons, or checkboxes option
const Option = z.object({
  type: z.literal('option'),                                // The type of option
  attributes: z.object({
    label: z.string(),                                      // The label of the option
    value: z.string(),                                      // The value of the option
  }),
});

const BaseOptionAttributes = Option.shape.attributes;

const CheckedOption = z.object({
  type: z.literal('option'),
  attributes: BaseOptionAttributes.extend({
    checked: z.boolean().optional(),
  }),
});

const SelectedOption = z.object({
  type: z.literal('option'),
  attributes: BaseOptionAttributes.extend({
    selected: z.boolean().optional(),
  }),
});

// Check boxes question and answer
export const CheckboxesQuestion = Question.merge(z.object({
  type: z.literal('checkBoxes'),                            // The type of question
  options: z.array(CheckedOption)
}));

// Radio buttons question and answer
export const RadioButtonsQuestion = Question.merge(z.object({
  type: z.literal('radioButtons'),                          // The type of question
  options: z.array(SelectedOption)
}));

// Select box question and answer
export const SelectBoxQuestion = Question.merge(z.object({
  type: z.literal('selectBox'),                             // The type of question
  options: z.array(SelectedOption),
  attributes: z.object({
    multiple: z.boolean().optional()                        // Whether to allow multiple selections (default is false)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type CheckboxesQuestionType = z.infer<typeof CheckboxesQuestion>;
export type RadioButtonsQuestionType = z.infer<typeof RadioButtonsQuestion>;
export type SelectBoxQuestionType = z.infer<typeof SelectBoxQuestion>;
