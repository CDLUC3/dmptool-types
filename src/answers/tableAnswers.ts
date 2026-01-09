import { z } from 'zod';
import { AnswerSchema } from './answer';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema
} from './optionBasedAnswers';
import {
  DateAnswerSchema,
  DateRangeAnswerSchema
} from './dateAnswers';
import {
  AffiliationSearchAnswerSchema,
  LicenseSearchAnswerSchema,
  MetadataStandardSearchAnswerSchema,
  RepositorySearchAnswerSchema
} from './graphQLAnswers';
import {
  CurrencyAnswerSchema,
  NumberAnswerSchema,
  NumberWithContextAnswerSchema
} from './numberAnswers';
import {
  DefaultTextAreaAnswer,
  EmailAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
} from './textAnswers';
import { DefaultMeta } from "../questions";

// Answers to Table Column Question Types (note that TableAnswer is not included here because we don't allow nested tables)
export const AnyTableColumnAnswerSchema = z.discriminatedUnion('type', [
  AffiliationSearchAnswerSchema,
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  CurrencyAnswerSchema,
  DateAnswerSchema,
  DateRangeAnswerSchema,
  EmailAnswerSchema,
  LicenseSearchAnswerSchema,
  MetadataStandardSearchAnswerSchema,
  MultiselectBoxAnswerSchema,
  NumberAnswerSchema,
  NumberWithContextAnswerSchema,
  RadioButtonsAnswerSchema,
  RepositorySearchAnswerSchema,
  SelectBoxAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
]);

export const TableRowAnswerSchema = z.object({
  columns: z.array(AnyTableColumnAnswerSchema)       // The answers for each column in the row
});
export const DefaultTableRowAnswer = TableRowAnswerSchema.parse({
  columns: [DefaultTextAreaAnswer]
});

// Answers to Table Question Types
export const TableAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('table'),
  columnHeadings: z.array(z.string()).default(['Column A']),
  answer: z.array(TableRowAnswerSchema)
});
export const DefaultTableAnswer = TableAnswerSchema.parse({
  type: 'table',
  columnHeadings: ['Column A'],
  answer: [DefaultTableRowAnswer],
  meta: DefaultMeta
});

export const ResearchOutputTableAnswerSchema = z.object({
  ...TableAnswerSchema.shape,
  type: z.literal('researchOutputTable'),
  columnHeadings: z.array(z.string()).default(['Title', 'Type']),
});
export const DefaultResearchOutputTableAnswer = ResearchOutputTableAnswerSchema.parse({
  type: 'researchOutputTable',
  columnHeadings: ['Title', 'Type'],
  answer: [{
    columns: [
      {
        type: 'text',
        answer: '',
        meta: DefaultMeta
      },
      {
        type: 'selectBox',
        answer: '',
        meta: DefaultMeta
      }
    ]
  }],
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswerSchema>;
export type TableRowAnswerType = z.infer<typeof TableRowAnswerSchema>;
export type ResearchOutputTableAnswerType = z.infer<typeof ResearchOutputTableAnswerSchema>;
export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;

export const TableAnswerJSONSchema = z.toJSONSchema(TableAnswerSchema);
export const TableRowAnswerJSONSchema = z.toJSONSchema(TableRowAnswerSchema);
export const ResearchOutputTableAnswerJSONSchema = z.toJSONSchema(ResearchOutputTableAnswerSchema);
export const AnyTableColumnAnswerJSONSchema = z.toJSONSchema(AnyTableColumnAnswerSchema);
