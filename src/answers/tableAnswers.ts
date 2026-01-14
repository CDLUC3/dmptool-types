import { z } from 'zod';
import { AnswerSchema } from './answer';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema,
  DefaultSelectBoxAnswer,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema,
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
  DefaultTextAnswer,
  DefaultTextAreaAnswer,
  EmailAnswerSchema,
  TextAnswerSchema,
  TextAreaAnswerSchema,
  URLAnswerSchema
} from './textAnswers';
import {
  DefaultMeta,
} from "../questions";

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

// A subset of AnyTableColumnAnswerSchema that includes the commonStandardId field.
// This is used to map answers in the Research Output table to elements of the
// RDA Common Standard.
const roCheckBoxesAnswerSchema = z.object({
  ...CheckboxesAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roDateAnswerSchema = z.object({
  ...DateAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roLicenseSearchAnswerSchema = z.object({
  ...LicenseSearchAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roMetadataStandardSearchAnswerSchema = z.object({
  ...MetadataStandardSearchAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roNumberWithContextAnswerSchema = z.object({
  ...NumberWithContextAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roRadioButtonsAnswerSchema = z.object({
  ...RadioButtonsAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roRepositorySearchAnswerSchema = z.object({
  ...RepositorySearchAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roSelectBoxAnswerSchema = z.object({
  ...SelectBoxAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roTextAnswerSchema = z.object({
  ...TextAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
const roTextAreaAnswerSchema = z.object({
  ...TextAreaAnswerSchema.shape,
  commonStandardId: z.string().optional()
});
export const AnyResearchOutputTableColumnAnswerSchema = z.discriminatedUnion('type', [
  roCheckBoxesAnswerSchema,
  roDateAnswerSchema,
  roLicenseSearchAnswerSchema,
  roMetadataStandardSearchAnswerSchema,
  roNumberWithContextAnswerSchema,
  roRadioButtonsAnswerSchema,
  roRepositorySearchAnswerSchema,
  roSelectBoxAnswerSchema,
  roTextAnswerSchema,
  roTextAreaAnswerSchema
]);

export const TableRowAnswerSchema = z.object({
  columns: z.array(AnyTableColumnAnswerSchema)       // The answers for each column in the row
});
export const DefaultTableRowAnswer = TableRowAnswerSchema.parse({
  columns: [DefaultTextAreaAnswer]
});

export const ResearchOutputTableRowAnswerSchema = z.object({
  columns: z.array(AnyResearchOutputTableColumnAnswerSchema)
})
export const DefaultResearchOutputTableRowAnswer = ResearchOutputTableRowAnswerSchema.parse({
  columns: [
    {
      ...DefaultTextAnswer,
      commonStandardId: 'title',
    },
    {
      ...DefaultSelectBoxAnswer,
      commonStandardId: 'type',
    },
  ]
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
  answer: z.array(ResearchOutputTableRowAnswerSchema)
});
export const DefaultResearchOutputTableAnswer = ResearchOutputTableAnswerSchema.parse({
  type: 'researchOutputTable',
  columnHeadings: ['Title', 'Type'],
  answer: [DefaultResearchOutputTableRowAnswer],
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type TableAnswerType = z.infer<typeof TableAnswerSchema>;
export type ResearchOutputTableAnswerType = z.infer<typeof ResearchOutputTableAnswerSchema>;
export type TableRowAnswerType = z.infer<typeof TableRowAnswerSchema>;
export type ResearchOutputTableRowAnswerType = z.infer<typeof ResearchOutputTableRowAnswerSchema>;

export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;
export type AnyResearchOutputTableColumnAnswerType = z.infer<typeof AnyResearchOutputTableColumnAnswerSchema>;

export const TableAnswerJSONSchema = z.toJSONSchema(TableAnswerSchema);
export const ResearchOutputTableAnswerJSONSchema = z.toJSONSchema(ResearchOutputTableAnswerSchema);
export const TableRowAnswerJSONSchema = z.toJSONSchema(TableRowAnswerSchema);
export const ResearchOutputTableRowAnswerJSONSchema = z.toJSONSchema(ResearchOutputTableRowAnswerSchema);
export const AnyTableColumnAnswerJSONSchema = z.toJSONSchema(AnyTableColumnAnswerSchema);
