import { z } from 'zod';
import { AnswerSchema } from './answer';
import { BooleanAnswerSchema, CheckboxesAnswerSchema, RadioButtonsAnswerSchema, SelectBoxAnswerSchema } from './optionBasedAnswers';
import { DateAnswerSchema, DateRangeAnswerSchema } from './dateAnswers';
import { FilteredSearchAnswerSchema, TypeaheadSearchAnswerSchema } from './graphQLAnswers';
import { CurrencyAnswerSchema, NumberAnswerSchema } from './numberAnswers';
import { EmailAnswerSchema, TextAnswerSchema, TextAreaAnswerSchema, URLAnswerSchema } from './textAnswers';

// Answers to Table Column Question Types (note that TableAnswer is not included here because we don't allow nested tables)
export const AnyTableColumnAnswerSchema = z.discriminatedUnion('type', [
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DateAnswerSchema,
  DateRangeAnswerSchema,
  EmailAnswerSchema,
  FilteredSearchAnswerSchema,
  NumberAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  TypeaheadSearchAnswerSchema,
  URLAnswerSchema
]);

export const TableColumnAnswerSchema = z.object({
  heading: z.string(),                                        // The heading of the column
  content: AnyTableColumnAnswerSchema                          // The answer to the column (based on the type)
});

export const TableRowAnswerSchema = z.object({
  columns: z.array(TableColumnAnswerSchema)                 // The answers for each column in the row
});

// Answers to Table Question Types
export const TableAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('table'),                                   // The type of answer
  answer: z.array(TableRowAnswerSchema)                       // The answers to the question (array of rows containing an array of columns)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswerSchema>;
export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;
