import { z } from "zod";
import {
  CurrencyQuestionSchema, DefaultNumberWithContextQuestion,
  NumberQuestionSchema,
  NumberWithContextQuestionSchema
} from "./numberQuestions";
import {
  EmailQuestionSchema,
  TextQuestionSchema,
  TextAreaQuestionSchema,
  URLQuestionSchema,
  DefaultTextQuestion,
  DefaultTextAreaQuestion
} from "./textQuestions";
import {
  DateQuestionSchema,
  DateRangeQuestionSchema, DefaultDateQuestion
} from "./dateQuestions";
import {
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  DefaultCheckboxesQuestion,
  DefaultRadioButtonsQuestion,
  DefaultSelectBoxQuestion,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema
} from './optionBasedQuestions';
import {
  AffiliationSearchQuestionSchema,
  RepositorySearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  LicenseSearchQuestionSchema,
  DefaultRepositorySearchQuestion,
  DefaultMetadataStandardSearchQuestion, DefaultLicenseSearchQuestion
} from './graphQLQuestions';
import {
  CURRENT_SCHEMA_VERSION,
  BaseAttributesSchema,
  DefaultMeta,
  QuestionSchema
} from "./question";

// Union types for all questions and answers (tables cannot be nested so no TableQuestion here!)
export const AnyTableColumnQuestionSchema = z.discriminatedUnion('type', [
  AffiliationSearchQuestionSchema,
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  CurrencyQuestionSchema,
  DateQuestionSchema,
  DateRangeQuestionSchema,
  EmailQuestionSchema,
  LicenseSearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  NumberQuestionSchema,
  NumberWithContextQuestionSchema,
  RadioButtonsQuestionSchema,
  RepositorySearchQuestionSchema,
  SelectBoxQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema,
]);

const TableAttributesSchema = BaseAttributesSchema.extend({
  canAddRows: z.boolean().default(true),
  canRemoveRows: z.boolean().default(true),
  initialRows: z.number().default(1),
  maxRows: z.number().optional(),                         // The maximum number of rows (no default)
  minRows: z.number().optional()                          // The minimum number of rows (no default)
});
const DefaultTableAttributes = TableAttributesSchema.parse({});

export const TableColumnSchema = z.object({
  heading: z.string().default('Column A'),                        // The heading of the column
  help: z.string().optional(),                                         // Help text for the column
  required: z.boolean().default(false),                           // Whether the column is required
  enabled: z.boolean().default(true),                             // Whether the column is enabled
  content: AnyTableColumnQuestionSchema
});
export const DefaultTableColumn = TableColumnSchema.parse({
  heading: 'Column A',
  help: 'Enter the value for column A',
  required: false,
  enabled: true,
  content: {
    type: 'textArea',
    attributes: { label: '' },
    meta: { schema: CURRENT_SCHEMA_VERSION }
  }
});

// Table question
export const TableQuestionSchema = z.object({
  ...QuestionSchema.shape,
  type: z.literal('table'),
  columns: z.array(TableColumnSchema),              // The columns of the table
  attributes: TableAttributesSchema.optional()
});
export const DefaultTableQuestion = TableQuestionSchema.parse({
  type: 'table',
  attributes: DefaultTableAttributes,
  meta: DefaultMeta,
  columns: [DefaultTableColumn]
});

// The available columns for the research output table question type (using the commonStandardId)
export const ResearchOutputTableColumnsEnum = z.enum([
  'title',
  'description',
  'type',
  'data_flags',
  'data_access',
  'issued',
  'byte_size',
  'host',
  'metadata',
  'license_ref',
  'custom'
]);

const ResearchOutputTableColumnPreferenceSchema = z.object({
  label: z.string().default(''),    // The label of the preference option
  value: z.string().default('')     // The value of the preference option
});

export const ResearchOutputTitleColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Title'),
  commonStandardId: z.literal('title'),
  help: z.string().default('Enter the title of this research output'),
  required: z.boolean().default(true),
  content: TextQuestionSchema
});
// Blank out the label and help text as these are set at the column level
const DefaultResearchOutputTitleContent = {
  ...DefaultTextQuestion,
  label: '',
  help: '',
}
export const DefaultResearchOutputTitleColumn = ResearchOutputTitleColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Title',
  commonStandardId: 'title',
  required: true,
  content: DefaultResearchOutputTitleContent
});

export const ResearchOutputDescriptionColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Description'),
  commonStandardId: z.literal('description'),
  help: z.string().default('Enter a brief description of this research output'),
  content: TextAreaQuestionSchema
});
// Blank out the label and help text as these are set at the column level
const DefaultResearchOutputDescriptionContent = {
  ...DefaultTextAreaQuestion,
  label: '',
  help: '',
}
export const DefaultResearchOutputDescriptionColumn = ResearchOutputDescriptionColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Description',
  commonStandardId: 'description',
  enabled: false,
  content: DefaultResearchOutputDescriptionContent
});

export const DefaultResearchOutputTypeOptions = [
  { label: 'Dataset', value: 'dataset' },
  { label: 'Software', value: 'software' },
  { label: 'Other', value: 'other' },
];
const DefaultResearchOutputTypeContent = SelectBoxQuestionSchema.parse({
  type: 'selectBox',
  attributes: DefaultSelectBoxQuestion.attributes,
  meta: DefaultMeta,
  options: DefaultResearchOutputTypeOptions
});
export const ResearchOutputTypeColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Type'),
  commonStandardId: z.literal('type'),
  help: z.string().default('Select the type of this research output'),
  required: z.boolean().default(true),
  content: SelectBoxQuestionSchema,
});
export const DefaultResearchOutputTypeColumn = ResearchOutputTypeColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Type',
  commonStandardId: 'type',
  required: true,
  content: DefaultResearchOutputTypeContent,
});

export const DefaultResearchOutputDataFlagsOptions = [
  { label: 'May contain sensitive data?', value: 'sensitive', checked: false },
  { label: 'May contain personally identifiable information?', value: 'personal', checked: false },
];
const DefaultResearchOutputDataFlagsContent = CheckboxesQuestionSchema.parse({
  type: 'checkBoxes',
  attributes: DefaultCheckboxesQuestion.attributes,
  meta: DefaultMeta,
  options: DefaultResearchOutputDataFlagsOptions
});
export const ResearchOutputDataFlagsColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Data Flags'),
  commonStandardId: z.literal('data_flags'),
  help: z.string().default('Mark all of the statements that are true about the dataset'),
  enabled: z.boolean().default(false),
  content: CheckboxesQuestionSchema,
})
export const DefaultResearchOutputDataFlagsColumn = ResearchOutputDataFlagsColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Data Flags',
  commonStandardId: 'data_flags',
  enabled: false,
  content: DefaultResearchOutputDataFlagsContent
});

export const DefaultResearchOutputAccessLevelOptions = [
  { label: 'Open Access', value: 'open' },
  { label: 'Restricted Access', value: 'restricted' },
  { label: 'Other', value: 'closed' },
];
const DefaultResearchOutputAccessLevelContent = RadioButtonsQuestionSchema.parse({
  type: 'radioButtons',
  attributes: DefaultRadioButtonsQuestion.attributes,
  meta: DefaultMeta,
  options: DefaultResearchOutputAccessLevelOptions
});
export const ResearchOutputAccessLevelColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Access Level'),
  commonStandardId: z.literal('data_access'),
  help: z.string().default('Select the access level for this research output'),
  enabled: z.boolean().default(false),
  content: RadioButtonsQuestionSchema,
});
export const DefaultResearchOutputAccessLevelColumn = ResearchOutputAccessLevelColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Access Level',
  commonStandardId: 'data_access',
  enabled: false,
  content: DefaultResearchOutputAccessLevelContent
});

export const ResearchOutputReleaseDateColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Anticipated Release Date'),
  commonStandardId: z.literal('issued'),
  help: z.string().default('The anticipated release date for the research output'),
  enabled: z.boolean().default(false),
  content: DateQuestionSchema,
})
export const DefaultResearchOutputReleaseDateColumn = ResearchOutputReleaseDateColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Anticipated Release Date',
  commonStandardId: 'issued',
  enabled: false,
  content: DefaultDateQuestion,
});

export const DefaultResearchOutputByteSizeOptions = [
  { label: 'bytes', value: 'bytes' },
  { label: 'KB (kilobytes)', value: 'kb' },
  { label: 'MB (megabytes)', value: 'mb' },
  { label: 'GB (gigabytes)', value: 'gb' },
  { label: 'TB (terabytes)', value: 'tb' },
  { label: 'PB (petabytes)', value: 'pb' }
];
const DefaultResearchOutputByteSizeContentAttributes = {
  ...DefaultNumberWithContextQuestion.attributes,
  context: DefaultResearchOutputByteSizeOptions,
};
const DefaultResearchOutputByteSizeContent = NumberWithContextQuestionSchema.parse({
  type: 'numberWithContext',
  attributes: DefaultResearchOutputByteSizeContentAttributes,
  meta: DefaultMeta,
});
export const ResearchOutputByteSizeColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Byte Size'),
  commonStandardId: z.literal('byte_size'),
  help: z.string().default('The size of the research output in bytes'),
  enabled: z.boolean().default(false),
  content: NumberWithContextQuestionSchema,
});
export const DefaultResearchOutputByteSizeColumn = ResearchOutputByteSizeColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Byte Size',
  commonStandardId: 'byte_size',
  enabled: false,
  content: DefaultResearchOutputByteSizeContent
});

export const ResearchOutputRepositoryColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Repository'),
  commonStandardId: z.literal('host'),
  help: z.string().default('Select repository(ies) you would prefer users to deposit in'),
  enabled: z.boolean().default(false),
  content: RepositorySearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
export const DefaultResearchOutputRepositoryColumn = ResearchOutputRepositoryColumnSchema.parse({
  heading: 'Repository(ies)',
  commonStandardId: 'host',
  enabled: false,
  content: DefaultRepositorySearchQuestion,
  preferences: []
});

export const ResearchOutputMetadataStandardColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Metadata Standard'),
  commonStandardId: z.literal('metadata'),
  help: z.string().default('Select metadata standard(s) you would prefer users to use'),
  enabled: z.boolean().default(false),
  content: MetadataStandardSearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
export const DefaultResearchOutputMetadataStandardColumn = ResearchOutputMetadataStandardColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'Metadata Standard(s)',
  commonStandardId: 'metadata',
  enabled: false,
  content: DefaultMetadataStandardSearchQuestion,
  preferences: []
});

export const ResearchOutputLicenseColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('License'),
  commonStandardId: z.literal('license_ref'),
  help: z.string().default('Select the license you will apply to the research output'),
  enabled: z.boolean().default(false),
  content: LicenseSearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
export const DefaultResearchOutputLicenseColumn = ResearchOutputLicenseColumnSchema.parse({
  // This commonStandardId is tied to how we render the dataset in the RDA Common Standard.
  // Any change will also need to be made to `buildDataset` function of
  // `src/lambda/layer/dmp.ts` in the `dmptool-infrastructure` repo.`
  heading: 'License',
  commonStandardId: 'license_ref',
  enabled: false,
  content: DefaultLicenseSearchQuestion,
  preferences: []
});

const ResearchOutputCustomContentAttributesSchema = TextQuestionSchema.shape.attributes.extend({
  label: z.string().optional(),
  help: z.string().optional(),
  maxLength: z.number().optional(),
  defaultValue: z.string().optional(),
});
const DefaultResearchOutputCustomContentAttributes = ResearchOutputCustomContentAttributesSchema.parse({});

const ResearchOutputCustomContentSchema = z.object({
  ...TextQuestionSchema.shape,
  attributes: ResearchOutputCustomContentAttributesSchema,
});
const DefaultResearchOutputCustomContent = ResearchOutputCustomContentSchema.parse({
  type: 'text',
  attributes: DefaultResearchOutputCustomContentAttributes,
  meta: DefaultMeta
});

export const ResearchOutputCustomColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Custom Column'),
  commonStandardId: z.literal('custom'),
  help: z.string().default('Explanation of what we expect the user to enter.'),
  enabled: z.boolean().default(false),
  content: ResearchOutputCustomContentSchema,
});
export const DefaultResearchOutputCustomColumn = ResearchOutputCustomColumnSchema.parse({
  heading: 'Custom Column',
  commonStandardId: 'custom',
  enabled: false,
  content: DefaultResearchOutputCustomContent
});

// Add this BEFORE ResearchOutputTableQuestionSchema
export const AnyResearchOutputColumnSchema = z.union([
  ResearchOutputTitleColumnSchema,
  ResearchOutputDescriptionColumnSchema,
  ResearchOutputTypeColumnSchema,
  ResearchOutputDataFlagsColumnSchema,
  ResearchOutputAccessLevelColumnSchema,
  ResearchOutputReleaseDateColumnSchema,
  ResearchOutputByteSizeColumnSchema,
  ResearchOutputRepositoryColumnSchema,
  ResearchOutputMetadataStandardColumnSchema,
  ResearchOutputLicenseColumnSchema,
  ResearchOutputCustomColumnSchema
]);

// Update ResearchOutputTableQuestionSchema
export const ResearchOutputTableQuestionSchema = z.object({
  ...TableQuestionSchema.shape,
  type: z.literal('researchOutputTable'),
  columns: z.array(AnyResearchOutputColumnSchema)
});
export const DefaultResearchOutputTableQuestion = ResearchOutputTableQuestionSchema.parse({
  type: 'researchOutputTable',
  attributes: DefaultTableAttributes,
  meta: DefaultMeta,
  columns: [
    DefaultResearchOutputTitleColumn,
    DefaultResearchOutputDescriptionColumn,
    DefaultResearchOutputTypeColumn,
    DefaultResearchOutputDataFlagsColumn,
    DefaultResearchOutputAccessLevelColumn,
    DefaultResearchOutputReleaseDateColumn,
    DefaultResearchOutputByteSizeColumn,
    DefaultResearchOutputRepositoryColumn,
    DefaultResearchOutputMetadataStandardColumn,
    DefaultResearchOutputLicenseColumn,
    DefaultResearchOutputCustomColumn,
  ]
});

// This will ensure that object validations are against the Zod schemas defined above
export type TableQuestionType = z.infer<typeof TableQuestionSchema>;
export type AnyTableColumnQuestionType = z.infer<typeof AnyTableColumnQuestionSchema>;
export type ResearchOutputTitleColumnType = z.infer<typeof ResearchOutputTitleColumnSchema>;
export type ResearchOutputDescriptionColumnType = z.infer<typeof ResearchOutputDescriptionColumnSchema>;
export type ResearchOutputTypeColumnType = z.infer<typeof ResearchOutputTypeColumnSchema>;
export type ResearchOutputDataFlagsColumnType = z.infer<typeof ResearchOutputDataFlagsColumnSchema>;
export type ResearchOutputAccessLevelColumnType = z.infer<typeof ResearchOutputAccessLevelColumnSchema>;
export type ResearchOutputReleaseDateColumnType = z.infer<typeof ResearchOutputReleaseDateColumnSchema>;
export type ResearchOutputByteSizeColumnType = z.infer<typeof ResearchOutputByteSizeColumnSchema>;
export type ResearchOutputRepositoryColumnType = z.infer<typeof ResearchOutputRepositoryColumnSchema>;
export type ResearchOutputMetadataStandardColumnType = z.infer<typeof ResearchOutputMetadataStandardColumnSchema>;
export type ResearchOutputLicenseColumnType = z.infer<typeof ResearchOutputLicenseColumnSchema>;
export type ResearchOutputCustomTableColumnType = z.infer<typeof ResearchOutputCustomColumnSchema>;
export type AnyResearchOutputColumnType = z.infer<typeof AnyResearchOutputColumnSchema>;
export type ResearchOutputTableQuestionType = z.infer<typeof ResearchOutputTableQuestionSchema>;

export const AnyTableColumnQuestionJSONSchema = z.toJSONSchema(AnyTableColumnQuestionSchema);
export const TableQuestionJSONSchema = z.toJSONSchema(TableQuestionSchema);
export const ResearchOutputTableQuestionJSONSchema = z.toJSONSchema(ResearchOutputTableQuestionSchema);
