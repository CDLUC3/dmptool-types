import { z } from "zod";

export const CURRENT_SCHEMA_VERSION = '1.0';                // The current schema version

// The type of question
export const QuestionTypesEnum = z.enum([
  'boolean',
  'checkBoxes',
  'currency',
  'date',
  'dateRange',
  'email',
  'filteredSearch',
  'number',
  'numberRange',
  'radioButtons',
  'selectBox',
  'table',
  'text',
  'textArea',
  'typeaheadSearch',
  'url'
]);

// Base abstract type for all questions
export const QuestionSchema = z.object({
  type: QuestionTypesEnum,                                  // The type of question
  meta: z.object({                                          // The metadata for the question
    schemaVersion: z.literal(CURRENT_SCHEMA_VERSION),       // The schema version (default is CURRENT_SCHEMA_VERSION)
    labelTranslationKey: z.string().optional()              // The translation key for the label (DMP Tool only)
  }),
});

// This will ensure that object validations are against the Zod schemas defined above
export type QuestionType = z.infer<typeof QuestionSchema>;
