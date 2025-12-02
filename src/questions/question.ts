import { z } from "zod";

export const CURRENT_SCHEMA_VERSION = '1.0';                // The current schema version

// The available question formats
export const QuestionFormatsEnum = z.enum([
  'affiliationSearch',
  'boolean',
  'checkBoxes',
  'currency',
  'date',
  'dateRange',
  'email',
  'licenseSearch',
  'metadataStandardSearch',
  'multiselectBox',
  'number',
  'numberRange',
  'numberWithContext',
  'radioButtons',
  'repositorySearch',
  'researchOutputTable',
  'selectBox',
  'table',
  'text',
  'textArea',
  'url'
]);

const DefaultMetaSchema = z.object({
  schemaVersion: z.string().default(CURRENT_SCHEMA_VERSION), // The schema version

  title: z.string().optional(),                // The title of the question type
  usageDescription: z.string().optional(),     // A description of when to use the question type
});

const DefaultAttributesSchema = z.object({
  label: z.string().optional(),                // UI label for the field
  help: z.string().optional(),                 // Help/tooltip text for the field
  labelTranslationKey: z.string().optional()   // The local translation key for the label
});

// Base abstract type for all questions
export const QuestionSchema = z.object({
  type: QuestionFormatsEnum,                   // The type of question
  attributes: DefaultAttributesSchema,         // Field attributes
  meta: DefaultMetaSchema.default({}),         // Meta information for the field
});

// This will ensure that object validations are against the Zod schemas defined above
// export type QuestionType = z.infer<typeof QuestionSchema>;
export type QuestionType = z.infer<typeof QuestionFormatsEnum>;

// Usage information to help determine when to use a specific Question format
export interface QuestionFormatsUsageInterface {
  title: string;
  usageDescription: string;
}

export const QuestionFormatsUsage: Record<QuestionType, QuestionFormatsUsageInterface> = {
  affiliationSearch: {
    title: 'Affiliation Search',
    usageDescription: 'For questions that require the user to select from a controlled list of institutions.',
  },
  boolean: {
    title: 'Yes/No Field',
    usageDescription: 'For questions that require a simple Yes/No response.',
  },
  checkBoxes: {
    title: 'Check Boxes',
    usageDescription: 'For multiple choice questions where users can select multiple options.',
  },
  currency: {
    title: 'Currency Field',
    usageDescription: 'For questions that require a monetary amount (e.g. Cost or Budget).',
  },
  date: {
    title: 'Date Field',
    usageDescription: 'For questions that require a date.',
  },
  dateRange: {
    title: 'Date Range',
    usageDescription: 'For questions that require a date range (e.g. From/To, Start/End)',
  },
  email: {
    title: 'Email Field',
    usageDescription: 'For questions that require require email address(es).',
  },
  licenseSearch: {
    title: 'License Search',
    usageDescription: 'For questions that require the user to select from a controlled list of licenses (e.g. Creative Commons, GNU, etc.).',
  },
  metadataStandardSearch: {
    title: 'Metadata Standard Search',
    usageDescription: 'For questions that require the user to select from a controlled list of metadata standards (e.g. Dublin Core, DataCite, etc.).',
  },
  multiselectBox: {
    title: 'Multi-select Box',
    usageDescription: 'For questions where multiple answers are valid. Allows users to select several options from a predefined list, providing flexibility in responses.',
  },
  number: {
    title: 'Number Field',
    usageDescription: 'For questions that require a single numeric value.',
  },
  numberRange: {
    title: 'Number Range',
    usageDescription: 'For questions that require a numerical range (e.g. From/To, Min/Max).',
  },
  numberWithContext: {
    title: 'Number with Context',
    usageDescription: 'For questions that require a numeric value along with additional context or description (e.g. units, explanation, etc.).',
  },
  radioButtons: {
    title: 'Radio Buttons',
    usageDescription: 'For multiple choice questions where users select just one option.',
  },
  repositorySearch: {
    title: 'Repository Search',
    usageDescription: 'For questions that require the user to select from a controlled list of repositories (e.g. Zenodo, Figshare, Dryad, etc.).',
  },
  researchOutputTable: {
    title: 'Research Output Table',
    usageDescription: 'For questions that require users to provide structured information about research outputs in a tabular format.',
  },
  selectBox: {
    title: 'Select Box',
    usageDescription: 'For questions where users select one option from a list.',
  },
  table: {
    title: 'Table',
    usageDescription: 'For questions that require a tabular format.',
  },
  text: {
    title: 'Text Field',
    usageDescription: 'For questions that require short, simple answers.',
  },
  textArea: {
    title: 'Text Area',
    usageDescription: 'For questions that require longer answers, you can select formatting options too.',
  },
  url: {
    title: 'URL Field',
    usageDescription: 'For questions that require a website, DOI or other URL.',
  }
}
