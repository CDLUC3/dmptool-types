import { z } from "zod";
import {
  BooleanQuestion,
  CurrencyQuestion,
  EmailQuestion,
  NumberQuestion,
  TextAreaQuestion,
  TextQuestion,
  URLQuestion,
} from "./primitiveQuestions";
import { DatePickerQuestion, DateRangeQuestion } from "./dateQuestions";
import { CheckboxesQuestion, RadioButtonsQuestion, SelectBoxQuestion } from './optionBasedQuestions';
import { FilteredSearchQuestion, TypeaheadSearchQuestion } from './graphQLQuestions';
import { Question } from "./question";

// Union types for all questions and answers (tables cannot be nested so no TableQuestion here!)
export const AnyTableColumnQuestion = z.discriminatedUnion('type', [
  BooleanQuestion,
  CheckboxesQuestion,
  CurrencyQuestion,
  DatePickerQuestion,
  DateRangeQuestion,
  EmailQuestion,
  FilteredSearchQuestion,
  NumberQuestion,
  RadioButtonsQuestion,
  SelectBoxQuestion,
  TextAreaQuestion,
  TextQuestion,
  TypeaheadSearchQuestion,
  URLQuestion
]);

// Table question and answer
export const TableQuestion = Question.merge(z.object({
  type: z.literal('table'),                                 // The type of question
  columns: z.array(AnyTableColumnQuestion),                // The columns of the table (note: tables cannot be nested)
  attributes: z.object({
    canAddRows: z.boolean().optional(),                     // Whether to allow adding rows (default is true)
    canRemoveRows: z.boolean().optional(),                  // Whether to allow removing rows (default is true)
    initialRows: z.number().optional(),                     // The initial number of rows (default is 1)
    maxRows: z.number().optional(),                         // The maximum number of rows (no default)
    minRows: z.number().optional()                          // The minimum number of rows (no default)
  })
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableQuestionType = z.infer<typeof TableQuestion>;
export type AnyTableColumnQuestionType = z.infer<typeof AnyTableColumnQuestion>;
