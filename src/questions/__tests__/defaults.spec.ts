import { DefaultDateQuestion, DefaultDateRangeQuestion } from "../dateQuestions";
import { expect, it } from "@jest/globals";
import {
  affiliationQuery,
  DefaultAffiliationSearchQuestion,
  DefaultLicenseSearchQuestion,
  DefaultMetadataStandardSearchQuestion,
  DefaultRepositorySearchQuestion,
  licenseQuery,
  metadataStandardQuery,
  repositoryQuery
} from "../graphQLQuestions";
import {
  DefaultCurrencyQuestion,
  DefaultNumberQuestion,
  DefaultNumberRangeQuestion,
  DefaultNumberWithContextQuestion
} from "../numberQuestions";
import {
  DefaultBooleanQuestion,
  DefaultCheckboxesQuestion, DefaultMultiselectBoxQuestion,
  DefaultRadioButtonsQuestion,
  DefaultSelectBoxQuestion
} from "../optionBasedQuestions";
import {
  DefaultResearchOutputTableQuestion,
  DefaultTableQuestion
} from "../tableQuestions";

describe('questions return the expected defaults', () => {
  it('returns the expected default affiliationSearch', () => {
    const expected = {
      type: "affiliationSearch",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      graphQL: {
        query: affiliationQuery,
        queryId: "useAffiliationsQuery",
        displayFields: [
          {
            propertyName: "displayName",
            label: "Institution",
            labelTranslationKey: "SignupPage.institution"
          }
        ],
        answerField: "uri",
        responseField: "affiliations.items",
        variables: [
          {
            type: "string",
            name: "name",
            label: "Search for your institution",
            minLength: 3,
            labelTranslationKey: "SignupPage.institutionHelp"
          },
        ]
      }
    };

    expect(DefaultAffiliationSearchQuestion).toEqual(expected);
  });

  it('returns the expected default boolean', () => {
    const expected = {
      type: "boolean",
      attributes: {
        label: 'Is it true?',
        value: false
      },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultBooleanQuestion).toEqual(expected);
  });

  it('returns the expected default checkBoxes', () => {
    const expected = {
      type: "checkBoxes",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      options: [{ label: 'Option A', selected: false, value: 'a' }]
    };
    expect(DefaultCheckboxesQuestion).toEqual(expected);
  });

  it('returns the expected default currency', () => {
    const expected = {
      type: "currency",
      attributes: { min: 0, step: 1, denomination: 'USD' },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultCurrencyQuestion).toEqual(expected);
  });

  it('returns the expected default date', () => {
    const expected = {
      type: "date",
      attributes: { step: 1 },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultDateQuestion).toEqual(expected);
  });

  it('returns the expected default dateRange', () => {
    const expected = {
      type: "dateRange",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      columns: {
        start: { label: 'From', step: 1 },
        end: { label: 'To', step: 1 }
      }
    };
    expect(DefaultDateRangeQuestion).toEqual(expected);
  });

  it('returns the expected default licenseSearch', () => {
    const expected = {
      type: "licenseSearch",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      graphQL: {
        query: licenseQuery,
        queryId: "useLicensesQuery",
        variables: [],
        responseField: "licenses",
        answerField: "uri",
        displayFields: [
          {
            propertyName: "name",
            label: "Name",
            labelTranslationKey: "LicenseSearch.name"
          },
          {
            propertyName: "description",
            label: "Description",
            labelTranslationKey: "LicenseSearch.description"
          },
          {
            propertyName: "recommended",
            label: "Recommended",
            labelTranslationKey: "LicenseSearch.recommended"
          }
        ]
      }
    };

    expect(DefaultLicenseSearchQuestion).toEqual(expected);
  });

  it('returns the expected default metadataStandardSearch', () => {
    const expected = {
      type: "metadataStandardSearch",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      graphQL: {
        query: metadataStandardQuery,
        queryId: "useMetadataStandardsQuery",
        variables: [
          {
            type: "string",
            name: "term",
            label: "Search for a metadata standard",
            labelTranslationKey: "MetadataStandardSearch.term",
            minLength: 3
          },
          {
            type: "string",
            name: "keywords",
            label: "Subject Areas",
            labelTranslationKey: "MetadataStandardSearch.keywords",
            minLength: 3
          },
          {
            type: "OFFSET",
            name: "paginationOptions",
            label: "Pagination Options",
            labelTranslationKey: "PaginationOptions.label"
          }
        ],
        responseField: "metadataStandards.items",
        answerField: "uri",
        displayFields: [
          {
            propertyName: "name",
            label: "Name",
            labelTranslationKey: "MetadataStandardSearch.name"
          },
          {
            propertyName: "description",
            label: "Description",
            labelTranslationKey: "MetadataStandardSearch.description"
          },
          {
            propertyName: "website",
            label: "Website",
            labelTranslationKey: "MetadataStandardSearch.website"
          },
          {
            propertyName: "keywords",
            label: "Subject Areas",
            labelTranslationKey: "MetadataStandardSearch.keywords"
          }
        ]
      }
    };

    expect(DefaultMetadataStandardSearchQuestion).toEqual(expected);
  });

  it('returns the expected default multiselectBox', () => {
    const expected = {
      type: "multiselectBox",
      attributes: { multiple: true },
      meta: { schemaVersion: "1.0" },
      options: [{ label: 'Option A', value: 'a', selected: false }]
    };
    expect(DefaultMultiselectBoxQuestion).toEqual(expected);
  });

  it('returns the expected default number', () => {
    const expected = {
      type: "number",
      attributes: { min: 0, step: 1 },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultNumberQuestion).toEqual(expected);
  });

  it('returns the expected default numberRange', () => {
    const expected = {
      type: "numberRange",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      columns: {
        start: { label: "From", min: 0, step: 1 },
        end: { label: "To", min: 0, step: 1 },
      }
    };
    expect(DefaultNumberRangeQuestion).toEqual(expected);
  });

  it('returns the expected default numberWithContext', () => {
    const expected = {
      type: "numberWithContext",
      attributes: { min: 0, step: 1, context: [] },
      meta: { schemaVersion: "1.0" }
    };
    expect(DefaultNumberWithContextQuestion).toEqual(expected);
  });

  it('returns the expected default radioButtons', () => {
    const expected = {
      type: "radioButtons",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      options: [{ label: 'Option A', value: 'a', selected: false }]
    };
    expect(DefaultRadioButtonsQuestion).toEqual(expected);
  });

  it('returns the expected default researchOutputTable', () => {
    const expected = {
      type: "researchOutputTable",
      attributes: {
        canAddRows: true,
        canRemoveRows: true,
        initialRows: 1,
      },
      meta: { schemaVersion: "1.0" },
      columns: [
        {
          heading: "Title",
          commonStandardId: 'title',
          help: "Enter the title of this research output",
          required: true,
          enabled: true,
          content: {
            type: "text",
            attributes: { maxLength: 255 },
            meta: { schemaVersion: "1.0" },
          }
        },
        {
          heading: "Description",
          commonStandardId: 'description',
          help: "Enter a brief description of this research output",
          required: false,
          enabled: false,
          content: {
            type: "textArea",
            attributes: {
              asRichText: true,
              cols: 20,
              maxLength: 10000,
              rows: 2
            },
            meta: { schemaVersion: "1.0" },
          }
        },
        {
          heading: "Type",
          commonStandardId: 'type',
          help: "Select the type of this research output",
          required: true,
          enabled: true,
          content: {
            type: "selectBox",
            attributes: { multiple: false },
            options: [
              { label: 'Dataset', value: 'dataset', selected: false },
              { label: 'Software', value: 'software', selected: false },
              { label: 'Other', value: 'other', selected: false }
            ],
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: 'Data Flags',
          commonStandardId: 'data_flags',
          help: 'Mark all of the statements that are true about the dataset',
          required: false,
          enabled: false,
          content: {
            type: "checkBoxes",
            meta: { schemaVersion: "1.0" },
            attributes: {},
            options: [
              {
                label: 'May contain sensitive data?',
                value: 'sensitive',
                selected: false
              },
              {
                label: 'May contain personally identifiable information?',
                value: 'personal',
                selected: false
              },
            ]
          }
        },
        {
          heading: 'Access Level',
          commonStandardId: 'data_access',
          help: 'Select the access level for this research output',
          required: false,
          enabled: false,
          content: {
            type: "radioButtons",
            meta: { schemaVersion: "1.0" },
            attributes: {},
            options: [
              { label: 'Open Access', value: 'open', selected: false },
              { label: 'Restricted Access', value: 'restricted', selected: false },
              { label: 'Other', value: 'closed', selected: false },
            ]
          }
        },
        {
          heading: "Anticipated Release Date",
          commonStandardId: 'issued',
          help: "The anticipated release date for the research output",
          required: false,
          enabled: false,
          content: {
            type: "date",
            attributes: {
              step: 1
            },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Byte Size",
          commonStandardId: 'byte_size',
          help: "The size of the research output in bytes",
          required: false,
          enabled: false,
          content: {
            type: "numberWithContext",
            attributes: {
              min: 0,
              step: 1,
              context: [
                { label: 'bytes', value: 'bytes', selected: false },
                { label: 'KB (kilobytes)', value: 'kb', selected: false },
                { label: 'MB (megabytes)', value: 'mb', selected: false },
                { label: 'GB (gigabytes)', value: 'gb', selected: false },
                { label: 'TB (terabytes)', value: 'tb', selected: false },
                { label: 'PB (petabytes)', value: 'pb', selected: false }
              ]
            },
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "Repository(ies)",
          commonStandardId: 'host',
          help: "Select repository(ies) you would prefer users to deposit in",
          required: false,
          enabled: false,
          preferences: [],
          content: {
            type: "repositorySearch",
            attributes: {},
            graphQL: {
              query: "query Repositories($term: String, $keywords: [String!], $repositoryType: String, $paginationOptions: PaginationOptions){ repositories(term: $term, keywords: $keywords, repositoryType: $repositoryType, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description website keywords repositoryTypes } } }",
              queryId: 'useRepositoriesQuery',
              displayFields: [
                {
                  propertyName: "name",
                  label: "Name",
                  labelTranslationKey: "RepositorySearch.name"
                },
                {
                  propertyName: "description",
                  label: "Description",
                  labelTranslationKey: "RepositorySearch.description"
                },
                {
                  propertyName: "website",
                  label: "Website",
                  labelTranslationKey: "RepositorySearch.website"
                },
                {
                  propertyName: "keywords",
                  label: "Subject Areas",
                  labelTranslationKey: "RepositorySearch.keywords"
                }
              ],
              answerField: "uri",
              responseField: "repositories.items",
              variables: [
                {
                  type: "string",
                  name: "term",
                  label: "Search for a repository",
                  labelTranslationKey: "RepositorySearch.term",
                  minLength: 3
                },
                {
                  type: "string",
                  name: "keywords",
                  label: "Subject Areas",
                  labelTranslationKey: "RepositorySearch.keywords",
                  minLength: 3
                },
                {
                  type: "string",
                  name: "repositoryType",
                  label: "Repository type",
                  labelTranslationKey: "RepositorySearch.repositoryType",
                  minLength: 3
                },
                {
                  type: "OFFSET",
                  name: "paginationOptions",
                  label: "Pagination Options",
                  labelTranslationKey: "PaginationOptions.label"
                }
              ],
            },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Metadata Standard(s)",
          commonStandardId: 'metadata',
          help: "Select metadata standard(s) you would prefer users to use",
          required: false,
          enabled: false,
          preferences: [],
          content: {
            type: "metadataStandardSearch",
            attributes: {},
            graphQL: {
              query: "query MetadataStandards($term: String, $keywords: [String!], $paginationOptions: PaginationOptions){ metadataStandards(term: $term, keywords: $keywords, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description keywords } } }",
              queryId: 'useMetadataStandardsQuery',
              displayFields: [
                {
                  propertyName: "name",
                  label: "Name",
                  labelTranslationKey: "MetadataStandardSearch.name"
                },
                {
                  propertyName: "description",
                  label: "Description",
                  labelTranslationKey: "MetadataStandardSearch.description"
                },
                {
                  propertyName: "website",
                  label: "Website",
                  labelTranslationKey: "MetadataStandardSearch.website"
                },
                {
                  propertyName: "keywords",
                  label: "Subject Areas",
                  labelTranslationKey: "MetadataStandardSearch.keywords"
                }
              ],
              answerField: "uri",
              responseField: "metadataStandards.items",
              variables: [
                {
                  type: "string",
                  name: "term",
                  label: "Search for a metadata standard",
                  labelTranslationKey: "MetadataStandardSearch.term",
                  minLength: 3
                },
                {
                  type: "string",
                  name: "keywords",
                  label: "Subject Areas",
                  labelTranslationKey: "MetadataStandardSearch.keywords",
                  minLength: 3
                },
                {
                  type: "OFFSET",
                  name: "paginationOptions",
                  label: "Pagination Options",
                  labelTranslationKey: "PaginationOptions.label"
                }
              ],
            },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "License",
          commonStandardId: 'license_ref',
          help: "Select the license you will apply to the research output",
          required: false,
          enabled: false,
          preferences: [],
          content: {
            type: "licenseSearch",
            attributes: {},
            graphQL: {
              query: "query Licenses{ licenses { id name uri description } }",
              queryId: 'useLicensesQuery',
              displayFields: [
                {
                  propertyName: "name",
                  label: "Name",
                  labelTranslationKey: "LicenseSearch.name"
                },
                {
                  propertyName: "description",
                  label: "Description",
                  labelTranslationKey: "LicenseSearch.description"
                },
                {
                  propertyName: "recommended",
                  label: "Recommended",
                  labelTranslationKey: "LicenseSearch.recommended",
                },
              ],
              answerField: "uri",
              responseField: "licenses",
              variables: [],
            },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Custom Column",
          help: "Explanation of what we expect the user to enter.",
          required: false,
          enabled: false,
          content: {
            type: "text",
            attributes: { maxLength: 255 },
            meta: { schemaVersion: "1.0" },
          }
        }
      ]
    };
    expect(DefaultResearchOutputTableQuestion).toEqual(expected);
  });

  it('returns the expected default repositorySearch', () => {
    const expected = {
      type: "repositorySearch",
      attributes: {},
      meta: { schemaVersion: "1.0" },
      graphQL: {
        query: repositoryQuery,
        queryId: "useRepositoriesQuery",
        variables: [
          {
            type: "string",
            name: "term",
            label: "Search for a repository",
            labelTranslationKey: "RepositorySearch.term",
            minLength: 3
          },
          {
            type: "string",
            name: "keywords",
            label: "Subject Areas",
            labelTranslationKey: "RepositorySearch.keywords",
            minLength: 3
          },
          {
            type: "string",
            name: "repositoryType",
            label: "Repository type",
            labelTranslationKey: "RepositorySearch.repositoryType",
            minLength: 3
          },
          {
            type: "OFFSET",
            name: "paginationOptions",
            label: "Pagination Options",
            labelTranslationKey: "PaginationOptions.label",
          }
        ],
        responseField: "repositories.items",
        answerField: "uri",
        displayFields: [
          {
            propertyName: "name",
            label: "Name",
            labelTranslationKey: "RepositorySearch.name"
          },
          {
            propertyName: "description",
            label: "Description",
            labelTranslationKey: "RepositorySearch.description"
          },
          {
            propertyName: "website",
            label: "Website",
            labelTranslationKey: "RepositorySearch.website"
          },
          {
            propertyName: "keywords",
            label: "Subject Areas",
            labelTranslationKey: "RepositorySearch.keywords"
          }
        ]
      }
    };

    expect(DefaultRepositorySearchQuestion).toEqual(expected);
  });

  it('returns the expected default selectBox', () => {
    const expected = {
      type: "selectBox",
      attributes: { multiple: false },
      meta: { schemaVersion: "1.0" },
      options: [{ label: 'Option A', value: 'a', selected: false }]
    };
    expect(DefaultSelectBoxQuestion).toEqual(expected);
  });

  it('returns the expected default table', () => {
    const expected = {
      type: "table",
      attributes: {
        canAddRows: true,
        canRemoveRows: true,
        initialRows: 1,
      },
      meta: { schemaVersion: "1.0" },
      columns: [
        {
          heading: "Column A",
          help: 'Enter the value for column A',
          enabled: true,
          required: false,
          content: {
            type: "textArea",
            attributes: {
              label: '',
              cols: 20,
              rows: 2,
              maxLength: 10000,
              asRichText: true,
            },
            meta: { schemaVersion: "1.0" }
          }
        }
      ]
    };
    expect(DefaultTableQuestion).toEqual(expected);
  });
});
