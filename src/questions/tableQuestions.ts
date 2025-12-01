import { z } from "zod";
import {
  CurrencyQuestionSchema,
  NumberQuestionSchema,
  NumberWithContextQuestionSchema
} from "./numberQuestions";
import {
  EmailQuestionSchema,
  TextQuestionSchema,
  TextAreaQuestionSchema,
  URLQuestionSchema
} from "./textQuestions";
import {
  DateQuestionSchema,
  DateRangeQuestionSchema
} from "./dateQuestions";
import {
  BooleanQuestionSchema,
  CheckboxesQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema
} from './optionBasedQuestions';
import {
  AffiliationSearchQuestionSchema,
  RepositorySearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  LicenseSearchQuestionSchema
} from './graphQLQuestions';
import {CURRENT_SCHEMA_VERSION, QuestionSchema} from "./question";

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
  LicenseSearchQuestionSchema,
  MetadataStandardSearchQuestionSchema,
  NumberQuestionSchema,
  NumberWithContextQuestionSchema,
  RadioButtonsQuestionSchema,
  RepositorySearchQuestionSchema,
  SelectBoxQuestionSchema,
  TextAreaQuestionSchema,
  TextQuestionSchema,
  URLQuestionSchema
]);

export const TableColumn = z.object({
  heading: z.string().default('Column A'),                        // The heading of the column
  required: z.boolean().default(false),                           // Whether the column is required
  enabled: z.boolean().default(true),                             // Whether the column is enabled
  content: AnyTableColumnQuestionSchema.default({ type: 'textArea'}),  // The question for the column
  meta: z.object({
    schemaVersion: z.string().default(CURRENT_SCHEMA_VERSION),         // The schema version
    labelTranslationKey: z.string().optional(),
  }).default({})
});

// Table question
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

export const ResearchOutputTableColumnPreferenceSchema = z.object({
  label: z.string().default(''),    // The label of the preference option
  value: z.string().default('')     // The value of the preference option
});

const ResearchOutputTitleColumnSchema = TableColumn.extend({
  heading: z.string().default('Title'),
  required: z.literal(true),
  content: TextQuestionSchema.extend({
    attributes: z.object({
      help: z.string().default('Enter the title of this research output'),
      labelTranslationKey: z.string().default('researchOutput.title.heading')
    }).default({})
  }).default({ type: 'text' })
});

const ResearchOutputDescriptionColumnSchema = TableColumn.extend({
  heading: z.string().default('Description'),
  content: TextAreaQuestionSchema.extend({
    attributes: z.object({
      help: z.string().default('Provide a brief description of this research output'),
      labelTranslationKey: z.string().default('researchOutput.description.heading')
    }).default({})
  }).default({ type: 'textArea' })
});

const ResearchOutputOutputTypeColumnSchema = TableColumn.extend({
  heading: z.string().default('Output Type'),
  required: z.literal(true),
  content: SelectBoxQuestionSchema.extend({
    attributes: z.object({
      multiple: z.literal(false),
      help: z.string().default('Select the type that best describes this research output'),
      labelTranslationKey: z.string().default('researchOutput.outputType.heading')
    }).default({ multiple: false }),
  }).default({ type: 'selectBox' })
});

const ResearchOutputDataFlagsColumnSchema = TableColumn.extend({
  heading: z.string().default('Data Flags'),
  enabled: z.boolean().default(false),
  content: CheckboxesQuestionSchema.extend({
    attributes: z.object({
      help: z.string().default('Select any data flags that apply to this research output'),
      labelTranslationKey: z.string().default('researchOutput.dataFlags.heading')
    }).default({}),
    options: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).default([
      { label: 'May contain sensitive data?', value: 'sensitive' },
      { label: 'May contain personally identifiable information?', value: 'personal' },
    ])
  }).default({ type: 'checkBoxes' })
});

const ResearchOutputAccessLevelColumnSchema = TableColumn.extend({
  heading: z.string().default('Initial Access Level'),
  enabled: z.boolean().default(false),
  content: SelectBoxQuestionSchema.extend({
    attributes: z.object({
      multiple: z.literal(false),
      help: z.string().default('The initial access level for the research output'),
      labelTranslationKey: z.string().default('researchOutput.accessLevel.heading')
    }).default({multiple: false}),
    options: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).default([
      {label: 'Unrestricted Access', value: 'open'},
      {label: 'Controlled Access', value: 'restricted'},
      {label: 'Other', value: 'closed'},
    ])
  }).default({ type: 'selectBox' })
});

const ResearchOutputReleaseDateColumnSchema = TableColumn.extend({
  heading: z.string().default('Anticipated Release Date'),
  enabled: z.boolean().default(false),
  content: DateQuestionSchema.extend({
    attributes: z.object({
      help: z.string().default('The anticipated release date for the research output'),
      labelTranslationKey: z.string().default('researchOutput.releaseDate.heading')
    }).default({})
  }).default({ type: 'date' })
});

const ResearchOutputByteSizeColumnSchema = TableColumn.extend({
  heading: z.string().default('Byte Size'),
  enabled: z.boolean().default(false),
  content: NumberWithContextQuestionSchema.extend({
    attributes: z.object({
      min: z.number().default(0),
      help: z.string().default('The size of the research output in bytes'),
      labelTranslationKey: z.string().default('researchOutput.byteSize.heading'),
      context: z.array(z.object({
        label: z.string().default('MB (megabytes)'),
        value: z.string().default('mb')
      })).default([
        { label: 'bytes', value: 'bytes' },
        { label: 'KB (kilobytes)', value: 'kb' },
        { label: 'MB (megabytes)', value: 'mb' },
        { label: 'GB (gigabytes)', value: 'gb' },
        { label: 'TB (terabytes)', value: 'tb' },
        { label: 'PB (petabytes)', value: 'pb' }
      ])
    }).default({})
  }).default({ type: 'numberWithContext' })
});

const ResearchOutputRepositoryColumnSchema = TableColumn.extend({
  heading: z.string().default('Repository'),
  enabled: z.boolean().default(false),
  content: RepositorySearchQuestionSchema.default({ type: 'repositorySearch' }),
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([]),
  attributes: z.object({
    help: z.string().default('Select repositor(ies) you would prefer users to deposit in'),
    labelTranslationKey: z.string().default('researchOutput.repository.heading')
  }).default({})
});

const ResearchOutputMetadataStandardColumnSchema = TableColumn.extend({
  heading: z.string().default('Metadata Standard'),
  enabled: z.boolean().default(false),
  content: MetadataStandardSearchQuestionSchema.default({ type: 'metadataStandardSearch' }),
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([]),
  attributes: z.object({
    help: z.string().default('Select metadata standard(s) you would prefer users to use'),
    labelTranslationKey: z.string().default('researchOutput.metadataStandard.heading')
  }).default({})
});

const ResearchOutputLicenseColumnSchema = TableColumn.extend({
  heading: z.string().default('License'),
  enabled: z.boolean().default(false),
  content: LicenseSearchQuestionSchema.default({ type: 'licenseSearch' }),
  preferences: z.array(ResearchOutputTableColumnPreferenceSchema).default([]),
  attributes: z.object({
    help: z.string().default('Select license(s) you would prefer users to apply to the research output'),
    labelTranslationKey: z.string().default('researchOutput.license.heading')
  }).default({})
});

const ResearchOutputCustomColumnSchema = TableColumn.extend({
  heading: z.string().default('Custom Column'),
  enabled: z.boolean().default(false),
  content: TextQuestionSchema.extend({
    attributes: z.object({
      help: z.string().default('Explanation of what we expect the user to enter.'),
      maxLength: z.number().default(255),
      defaultValue: z.string().optional(),
    }).default({})
  }).default({ type: 'text' })
});

const defaultTitleColumn = ResearchOutputTitleColumnSchema.parse({
  required: true,
  content: { type: 'text' }
});
const defaultDescriptionColumn = ResearchOutputDescriptionColumnSchema.parse({});
const defaultOutputTypeColumn = ResearchOutputOutputTypeColumnSchema.parse({
  required: true,
  content: { type: 'selectBox' }
});
const defaultDataFlagsColumn = ResearchOutputDataFlagsColumnSchema.parse({});
const defaultAccessLevelColumn = ResearchOutputAccessLevelColumnSchema.parse({});
const defaultReleaseDateColumn = ResearchOutputReleaseDateColumnSchema.parse({});
const defaultByteSizeColumn = ResearchOutputByteSizeColumnSchema.parse({});
const defaultRepositoryColumn = ResearchOutputRepositoryColumnSchema.parse({});
const defaultMetadataStandardColumn = ResearchOutputMetadataStandardColumnSchema.parse({});
const defaultLicenseColumn = ResearchOutputLicenseColumnSchema.parse({});
const defaultCustomColumn = ResearchOutputCustomColumnSchema.parse({});

export const ResearchOutputTableQuestionSchema = TableQuestionSchema.merge(z.object({
  type: z.literal('researchOutputTable'),
  columns: z.array(TableColumn).default([
    defaultTitleColumn,
    defaultDescriptionColumn,
    defaultOutputTypeColumn,
    defaultDataFlagsColumn,
    defaultAccessLevelColumn,
    defaultReleaseDateColumn,
    defaultByteSizeColumn,
    defaultRepositoryColumn,
    defaultMetadataStandardColumn,
    defaultLicenseColumn,
    defaultCustomColumn
  ]),
}));

// This will ensure that object validations are against the Zod schemas defined above
export type TableQuestionType = z.infer<typeof TableQuestionSchema>;
export type AnyTableColumnQuestionType = z.infer<typeof AnyTableColumnQuestionSchema>;
export type ResearchOutputTableQuestionType = z.infer<typeof ResearchOutputTableQuestionSchema>;
