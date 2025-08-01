import { z } from "zod";
import { CurrencyQuestionSchema, NumberQuestionSchema } from "./numberQuestions";
import { EmailQuestionSchema, TextQuestionSchema, TextAreaQuestionSchema, URLQuestionSchema } from "./textQuestions";
import { DateQuestionSchema, DateRangeQuestionSchema } from "./dateQuestions";
import { BooleanQuestionSchema, CheckboxesQuestionSchema, RadioButtonsQuestionSchema, SelectBoxQuestionSchema } from './optionBasedQuestions';
import {
  AffiliationSearchQuestionSchema,
  FilteredSearchQuestionSchema,
} from './graphQLQuestions';
import { QuestionSchema } from "./question";

const BaseAttributes = QuestionSchema.shape.attributes;

// Union types for all questions and answers (tables cannot be nested so no TableQuestion here!)
export const AnyTableColumnQuestionSchema = z.discriminatedUnion('type', [
  AffiliationSearchQuestionSchema,
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
  URLQuestionSchema
]);

export const TableColumn = z.object({
  heading: z.string().default('Column A'),                        // The heading of the column
  content: AnyTableColumnQuestionSchema.default({ type: 'textArea'}),  // The question for the column
});

// Table question and answer
export const TableQuestionSchema = QuestionSchema.merge(z.object({
  type: z.literal('table'),
  columns: z.array(TableColumn).default([{}]),              // The columns of the table
  attributes: BaseAttributes.merge(z.object({
    canAddRows: z.boolean().default(true),
    canRemoveRows: z.boolean().default(true),
    initialRows: z.number().default(1),
    maxRows: z.number().optional(),                         // The maximum number of rows (no default)
    minRows: z.number().optional()                          // The minimum number of rows (no default)
  })).default({})
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableQuestionType = z.infer<typeof TableQuestionSchema>;
export type AnyTableColumnQuestionType = z.infer<typeof AnyTableColumnQuestionSchema>;
