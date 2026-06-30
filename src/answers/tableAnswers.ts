import { z } from 'zod';
import { AnswerSchema } from './answer';
import {
  BooleanAnswerSchema,
  CheckboxesAnswerSchema, DefaultCheckboxesAnswer, DefaultRadioButtonsAnswer,
  DefaultSelectBoxAnswer,
  MultiselectBoxAnswerSchema,
  RadioButtonsAnswerSchema,
  SelectBoxAnswerSchema,
} from './optionBasedAnswers';
import {
  DateAnswerSchema,
  DateRangeAnswerSchema, DefaultDateAnswer
} from './dateAnswers';
import {
  AffiliationSearchAnswerSchema, DefaultLicenseSearchAnswer,
  DefaultMetadataStandardSearchAnswer, DefaultRepositorySearchAnswer,
  LicenseSearchAnswerSchema,
  MetadataStandardSearchAnswerSchema,
  RepositorySearchAnswerSchema
} from './graphQLAnswers';
import {
  CurrencyAnswerSchema, DefaultNumberWithContextAnswer,
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

// A subset of AnyTableColumnAnswerSchema that includes the commonStandardId field.
// This is used to map answers in the Research Output table to elements of the
// RDA Common Standard.
export const ResearchOutputTitleAnswerSchema = z.object({
  ...TextAnswerSchema.shape,
  commonStandardId: z.literal('title')
});
export const DefaultResearchOutputTitleAnswer = ResearchOutputTitleAnswerSchema.parse({
  ...DefaultTextAnswer,
  commonStandardId: 'title'
});

export const ResearchOutputDescriptionAnswerSchema = z.object({
  ...TextAreaAnswerSchema.shape,
  commonStandardId: z.literal('description')
});
export const DefaultResearchOutputDescriptionAnswer = ResearchOutputDescriptionAnswerSchema.parse({
  ...DefaultTextAreaAnswer,
  commonStandardId: 'description'
});

export const ResearchOutputTypeAnswerSchema = z.object({
  ...SelectBoxAnswerSchema.shape,
  commonStandardId: z.literal('type')
});
export const DefaultResearchOutputTypeAnswer = ResearchOutputTypeAnswerSchema.parse({
  ...DefaultSelectBoxAnswer,
  answer: 'dataset',
  commonStandardId: 'type'
});

export const ResearchOutputDataFlagsAnswerSchema = z.object({
  ...CheckboxesAnswerSchema.shape,
  commonStandardId: z.literal('data_flags')
});
export const DefaultResearchOutputDataFlagsAnswer = ResearchOutputDataFlagsAnswerSchema.parse({
  ...DefaultCheckboxesAnswer,
  commonStandardId: 'data_flags'
});

export const ResearchOutputAccessLevelAnswerSchema = z.object({
  ...RadioButtonsAnswerSchema.shape,
  commonStandardId: z.literal('data_access')
});
export const DefaultResearchOutputAccessLevelAnswer = ResearchOutputAccessLevelAnswerSchema.parse({
  ...DefaultRadioButtonsAnswer,
  commonStandardId: 'data_access'
});

export const ResearchOutputReleaseDateAnswerSchema = z.object({
  ...DateAnswerSchema.shape,
  commonStandardId: z.literal('issued')
});
export const DefaultResearchOutputReleaseDateAnswer = ResearchOutputReleaseDateAnswerSchema.parse({
  ...DefaultDateAnswer,
  commonStandardId: 'issued'
});

export const ResearchOutputByteSizeAnswerSchema = z.object({
  ...NumberWithContextAnswerSchema.shape,
  commonStandardId: z.literal('byte_size')
});
export const DefaultResearchOutputByteSizeAnswer = ResearchOutputByteSizeAnswerSchema.parse({
  ...DefaultNumberWithContextAnswer,
  commonStandardId: 'byte_size'
});

export const ResearchOutputRepositoryAnswerSchema = z.object({
  ...RepositorySearchAnswerSchema.shape,
  commonStandardId: z.literal('host')
});
export const DefaultResearchOutputRepositoryAnswer = ResearchOutputRepositoryAnswerSchema.parse({
  ...DefaultRepositorySearchAnswer,
  commonStandardId: 'host'
});

export const ResearchOutputMetadataStandardAnswerSchema = z.object({
  ...MetadataStandardSearchAnswerSchema.shape,
  commonStandardId: z.literal('metadata')
});
export const DefaultResearchOutputMetadataStandardAnswer = ResearchOutputMetadataStandardAnswerSchema.parse({
  ...DefaultMetadataStandardSearchAnswer,
  commonStandardId: 'metadata'
});

export const ResearchOutputLicenseAnswerSchema = z.object({
  ...LicenseSearchAnswerSchema.shape,
  commonStandardId: z.literal('license_ref')
});
export const DefaultResearchOutputLicenseAnswer = ResearchOutputLicenseAnswerSchema.parse({
  ...DefaultLicenseSearchAnswer,
  commonStandardId: 'license_ref'
});

export const ResearchOutputCustomTableAnswerSchema = z.object({
  ...TextAnswerSchema.shape,
  commonStandardId: z.literal('custom')
});
export const DefaultResearchOutputCustomTableAnswer = ResearchOutputCustomTableAnswerSchema.parse({
  ...DefaultTextAnswer,
  commonStandardId: 'custom'
})

export const AnyResearchOutputTableColumnAnswerSchema = z.discriminatedUnion('commonStandardId', [
  ResearchOutputTitleAnswerSchema,
  ResearchOutputDescriptionAnswerSchema,
  ResearchOutputTypeAnswerSchema,
  ResearchOutputDataFlagsAnswerSchema,
  ResearchOutputAccessLevelAnswerSchema,
  ResearchOutputReleaseDateAnswerSchema,
  ResearchOutputByteSizeAnswerSchema,
  ResearchOutputRepositoryAnswerSchema,
  ResearchOutputMetadataStandardAnswerSchema,
  ResearchOutputLicenseAnswerSchema,
  ResearchOutputCustomTableAnswerSchema
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
    DefaultResearchOutputTitleAnswer,
    DefaultResearchOutputTypeAnswer,
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
export type ResearchOutputTitleColumnAnswerType = z.infer<typeof ResearchOutputTitleAnswerSchema>;
export type ResearchOutputDescriptionColumnAnswerType = z.infer<typeof ResearchOutputDescriptionAnswerSchema>;
export type ResearchOutputTypeColumnAnswerType = z.infer<typeof ResearchOutputTypeAnswerSchema>;
export type ResearchOutputDataFlagsColumnAnswerType = z.infer<typeof ResearchOutputDataFlagsAnswerSchema>;
export type ResearchOutputAccessLevelColumnAnswerType = z.infer<typeof ResearchOutputAccessLevelAnswerSchema>;
export type ResearchOutputReleaseDateColumnAnswerType = z.infer<typeof ResearchOutputReleaseDateAnswerSchema>;
export type ResearchOutputByteSizeColumnAnswerType = z.infer<typeof ResearchOutputByteSizeAnswerSchema>;
export type ResearchOutputRepositoryColumnAnswerType = z.infer<typeof ResearchOutputRepositoryAnswerSchema>;
export type ResearchOutputMetadataStandardColumnAnswerType = z.infer<typeof ResearchOutputMetadataStandardAnswerSchema>;
export type ResearchOutputLicenseColumnAnswerType = z.infer<typeof ResearchOutputLicenseAnswerSchema>;
export type ResearchOutputCustomTableColumnAnswerType = z.infer<typeof ResearchOutputCustomTableAnswerSchema>;

export type AnyTableColumnAnswerType = z.infer<typeof AnyTableColumnAnswerSchema>;
export type AnyResearchOutputTableColumnAnswerType = z.infer<typeof AnyResearchOutputTableColumnAnswerSchema>;

export const TableAnswerJSONSchema = z.toJSONSchema(TableAnswerSchema);
export const ResearchOutputTableAnswerJSONSchema = z.toJSONSchema(ResearchOutputTableAnswerSchema);
export const TableRowAnswerJSONSchema = z.toJSONSchema(TableRowAnswerSchema);
export const ResearchOutputTableRowAnswerJSONSchema = z.toJSONSchema(ResearchOutputTableRowAnswerSchema);
export const AnyTableColumnAnswerJSONSchema = z.toJSONSchema(AnyTableColumnAnswerSchema);
