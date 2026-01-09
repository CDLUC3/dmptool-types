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

const ResearchOutputTableColumnPreferenceSchema = z.object({
  label: z.string().default(''),    // The label of the preference option
  value: z.string().default('')     // The value of the preference option
});

const ResearchOutputTitleColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Title'),
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
const DefaultResearchOutputTitleColumn = ResearchOutputTitleColumnSchema.parse({
  heading: 'Title',
  required: true,
  content: DefaultResearchOutputTitleContent
});

const ResearchOutputDescriptionColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Description'),
  help: z.string().default('Enter a brief description of this research output'),
  content: TextAreaQuestionSchema
});
// Blank out the label and help text as these are set at the column level
const DefaultResearchOutputDescriptionContent = {
  ...DefaultTextAreaQuestion,
  label: '',
  help: '',
}
const DefaultResearchOutputDescriptionColumn = ResearchOutputDescriptionColumnSchema.parse({
  heading: 'Description',
  enabled: false,
  content: DefaultResearchOutputDescriptionContent
});

const DefaultResearchOutputTypeOptions = [
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
const ResearchOutputTypeColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Type'),
  help: z.string().default('Select the type of this research output'),
  required: z.boolean().default(true),
  content: SelectBoxQuestionSchema,
});
const DefaultResearchOutputTypeColumn = ResearchOutputTypeColumnSchema.parse({
  heading: 'Type',
  required: true,
  content: DefaultResearchOutputTypeContent,
});

const DefaultResearchOutputDataFlagsOptions = [
  { label: 'May contain sensitive data?', value: 'sensitive', checked: false },
  { label: 'May contain personally identifiable information?', value: 'personal', checked: false },
];
const DefaultResearchOutputDataFlagsContent = CheckboxesQuestionSchema.parse({
  type: 'checkBoxes',
  attributes: DefaultCheckboxesQuestion.attributes,
  meta: DefaultMeta,
  options: DefaultResearchOutputDataFlagsOptions
});
const ResearchOutputDataFlagsColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Data Flags'),
  help: z.string().default('Mark all of the statements that are true about the dataset'),
  enabled: z.boolean().default(false),
  content: CheckboxesQuestionSchema,
})
const DefaultResearchOutputDataFlagsColumn = ResearchOutputDataFlagsColumnSchema.parse({
  heading: 'Data Flags',
  enabled: false,
  content: DefaultResearchOutputDataFlagsContent
});

const DefaultResearchOutputAccessLevelOptions = [
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
const ResearchOutputAccessLevelColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Access Level'),
  help: z.string().default('Select the access level for this research output'),
  enabled: z.boolean().default(false),
  content: RadioButtonsQuestionSchema,
});
const DefaultResearchOutputAccessLevelColumn = ResearchOutputAccessLevelColumnSchema.parse({
  heading: 'Access Level',
  enabled: false,
  content: DefaultResearchOutputAccessLevelContent
});

const ResearchOutputReleaseDateColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Anticipated Release Date'),
  help: z.string().default('The anticipated release date for the research output'),
  enabled: z.boolean().default(false),
  content: DateQuestionSchema,
})
const DefaultResearchOutputReleaseDateColumn = ResearchOutputReleaseDateColumnSchema.parse({
  heading: 'Anticipated Release Date',
  enabled: false,
  content: DefaultDateQuestion,
});

const DefaultResearchOutputByteSizeOptions = [
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
const ResearchOutputByteSizeColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Byte Size'),
  help: z.string().default('The size of the research output in bytes'),
  enabled: z.boolean().default(false),
  content: NumberWithContextQuestionSchema,
});
const DefaultResearchOutputByteSizeColumn = ResearchOutputByteSizeColumnSchema.parse({
  heading: 'Byte Size',
  enabled: false,
  content: DefaultResearchOutputByteSizeContent
});

const ResearchOutputRepositoryColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Repository'),
  help: z.string().default('Select repository(ies) you would prefer users to deposit in'),
  enabled: z.boolean().default(false),
  content: RepositorySearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
const DefaultResearchOutputRepositoryColumn = ResearchOutputRepositoryColumnSchema.parse({
  heading: 'Repository(ies)',
  enabled: false,
  content: DefaultRepositorySearchQuestion,
  preferences: []
});

const ResearchOutputMetadataStandardColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('Metadata Standard'),
  help: z.string().default('Select metadata standard(s) you would prefer users to use'),
  enabled: z.boolean().default(false),
  content: MetadataStandardSearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
const DefaultResearchOutputMetadataStandardColumn = ResearchOutputMetadataStandardColumnSchema.parse({
  heading: 'Metadata Standard(s)',
  enabled: false,
  content: DefaultMetadataStandardSearchQuestion,
  preferences: []
});

const ResearchOutputLicenseColumnSchema = z.object({
  ...TableColumnSchema.shape,
  heading: z.string().default('License'),
  help: z.string().default('Select the license you will apply to the research output'),
  enabled: z.boolean().default(false),
  content: LicenseSearchQuestionSchema,
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([])
});
const DefaultResearchOutputLicenseColumn = ResearchOutputLicenseColumnSchema.parse({
  heading: 'License',
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
  help: z.string().default('Explanation of what we expect the user to enter.'),
  enabled: z.boolean().default(false),
  content: ResearchOutputCustomContentSchema,
});
export const DefaultResearchOutputCustomColumn = ResearchOutputCustomColumnSchema.parse({
  heading: 'Custom Column',
  enabled: false,
  content: DefaultResearchOutputCustomContent
});

// Add this BEFORE ResearchOutputTableQuestionSchema
const AnyResearchOutputColumnSchema = z.union([
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
export type ResearchOutputCustomTableColumnType = z.infer<typeof ResearchOutputCustomColumnSchema>;
export type AnyResearchOutputColumnType = z.infer<typeof AnyResearchOutputColumnSchema>;
export type ResearchOutputTableQuestionType = z.infer<typeof ResearchOutputTableQuestionSchema>;

export const AnyTableColumnQuestionJSONSchema = z.toJSONSchema(AnyTableColumnQuestionSchema);
export const TableQuestionJSONSchema = z.toJSONSchema(TableQuestionSchema);
export const ResearchOutputTableQuestionJSONSchema = z.toJSONSchema(ResearchOutputTableQuestionSchema);
