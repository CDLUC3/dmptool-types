import { z } from 'zod';
import { AnswerSchema } from './answer';
import { CheckboxesAnswerSchema, RadioButtonsAnswerSchema, SelectBoxAnswerSchema } from './optionBasedAnswers';
import { DatePickerAnswerSchema, DateRangeAnswerSchema } from './dateAnswers';
import { FilteredSearchAnswerSchema, TypeaheadSearchAnswerSchema } from './graphQLAnswers';
import {
  BooleanAnswerSchema,
  CurrencyAnswerSchema,
  EmailAnswerSchema,
  NumberAnswerSchema,
  TextAreaAnswerSchema,
  TextAnswerSchema,
  URLAnswerSchema
} from './primitiveAnswers';

// Answers to Table Column Question Types (note that TableAnswer is not included here because we don't allow nested tables)
export const AnyTableColumnAnswerSchema = z.discriminatedUnion('type', [
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DatePickerAnswerSchema,
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

// Answers to Table Question Types
export const TableAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('table'),                                   // The type of answer
  answer: z.array(AnyTableColumnAnswerSchema)                 // The answer to the question (array of answers)
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswerSchema>;
export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;
