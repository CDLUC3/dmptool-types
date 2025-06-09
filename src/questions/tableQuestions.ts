import { z } from "zod";
import {
  BooleanQuestionSchema,
  CurrencyQuestionSchema,
  EmailQuestionSchema,
  NumberQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema,
} from "./primitiveQuestions";
import { DateQuestionSchema, DateRangeQuestionSchema } from "./dateQuestions";
import { CheckboxesQuestionSchema, RadioButtonsQuestionSchema, SelectBoxQuestionSchema } from './optionBasedQuestions';
import { FilteredSearchQuestionSchema, TypeaheadSearchQuestionSchema } from './graphQLQuestions';
import { QuestionSchema } from "./question";

// Union types for all questions and answers (tables cannot be nested so no TableQuestion here!)
export const AnyTableColumnQuestionSchema = z.discriminatedUnion('type', [
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  CurrencyQuestionSchema,
  DateQuestionSchema,
  DateRangeQuestionSchema,
  EmailQuestionSchema,
  FilteredSearchQuestionSchema,
  NumberQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  TypeaheadSearchQuestionSchema,
  URLQuestionSchema
]);

export const TableColumn = z.object({
  heading: z.string().optional(),                           // The heading of the column
  content: AnyTableColumnQuestionSchema,                    // The question for the column
});

// Table question and answer
export const TableQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('table'),                                 // The type of question
  columns: z.array(TableColumn),                            // The columns of the table
  attributes: z.object({
    canAddRows: z.boolean().optional(),                     // Whether to allow adding rows (default is true)
    canRemoveRows: z.boolean().optional(),                  // Whether to allow removing rows (default is true)
    initialRows: z.number().optional(),                     // The initial number of rows (default is 1)
    maxRows: z.number().optional(),                         // The maximum number of rows (no default)
    minRows: z.number().optional()                          // The minimum number of rows (no default)
  }).optional(),
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableQuestionType = z.infer<typeof TableQuestionSchema>;
export type AnyTableColumnQuestionType = z.infer<typeof AnyTableColumnQuestionSchema>;
