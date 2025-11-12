import { z } from 'zod';
import { AnswerSchema } from './answer';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema
} from './optionBasedAnswers';
import { DateAnswerSchema, DateRangeAnswerSchema } from './dateAnswers';
import { FilteredSearchAnswerSchema, AffiliationSearchAnswerSchema } from './graphQLAnswers';
import { CurrencyAnswerSchema, NumberAnswerSchema } from './numberAnswers';
import { EmailAnswerSchema, TextAnswerSchema, TextAreaAnswerSchema, URLAnswerSchema } from './textAnswers';
import {CURRENT_SCHEMA_VERSION} from "../questions";

// Answers to Table Column Question Types (note that TableAnswer is not included here because we don't allow nested tables)
export const AnyTableColumnAnswerSchema = z.discriminatedUnion('type', [
  AffiliationSearchAnswerSchema,
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DateAnswerSchema,
  DateRangeAnswerSchema,
  EmailAnswerSchema,
  FilteredSearchAnswerSchema,
  MultiselectBoxAnswerSchema,
  NumberAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
]);

export const TableRowAnswerSchema = z.object({
  columns: z.array(AnyTableColumnAnswerSchema)       // The answers for each column in the row
});

// Answers to Table Question Types
export const TableAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('table'),
  columnHeadings: z.array(z.string()).default(['Column A']),
  answer: z.array(TableRowAnswerSchema).default([{
    columns: [{
      type: 'textArea',
      answer: '',
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    }]
  }])
}));

export const ResearchOutputTableAnswerSchema = TableAnswerSchema.merge(z.object({
  type: z.literal('researchOutputTable'),
  columnHeadings: z.array(z.string()).default(['Title', 'Output Type']),
  answer: z.array(TableRowAnswerSchema).default([{
    columns: [
      {
        type: 'text',
        answer: '',
        meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
      },
      {
        type: 'selectBox',
        answer: '',
        meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
      }
    ]
  }])
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswerSchema>;
export type ResearchOutputTableAnswerType = z.infer<typeof ResearchOutputTableAnswerSchema>;
export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;
