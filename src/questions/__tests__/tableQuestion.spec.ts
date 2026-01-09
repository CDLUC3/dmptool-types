import {
  TableQuestionSchema,
  ResearchOutputTableQuestionSchema
} from "../tableQuestions";

describe("TableQuestionSchema", () => {
  it("should validate a valid TableQuestion object", () => {
    const validTableQuestion = {
      type: "table",
      attributes: {
        label: "Table",
      },
      columns: [
        {
          heading: "Name",
          content: {
            type: "text",
            attributes: { maxLength: 100 },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Age",
          content: {
            type: "number",
            attributes: {
              label: "Age",
              help: "Enter your age",
              min: 18,
              max: 65,
              step: 1,
            },
            meta: { schemaVersion: "1.0" }
          }
        }
      ],
      meta: { schemaVersion: "1.0" }
    };

    expect(() => TableQuestionSchema.parse(validTableQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid TableQuestion object", () => {
    const invalidTableQuestion = {
      type: "table",
      columns: [
        {
          heading: "Name",
          content: {
            type: "text",
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "Age",
          content: {
            type: "number",
            attributes: {
              min: '10', // Invalid value
              max: 120,
              step: 1,
            },
            meta: {
              schemaVersion: "1.0"
            }
          }
        }
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => TableQuestionSchema.parse(invalidTableQuestion)).toThrow();
  });
});

describe("ResearchOutputTableQuestionSchema", () => {
  it("should validate a valid ResearchOutputTableQuestion object", () => {
    const validResearchOutputTableQuestion = {
      type: "researchOutputTable",
      columns: [
        {
          heading: "Title",
          commonStandardId: 'title',
          required: true,
          enabled: true,
          content: {
            type: "text",
            attributes: { maxLength: 255 },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Output Type",
          commonStandardId: 'type',
          required: true,
          enabled: true,
          content: {
            type: "selectBox",
            attributes: {
              multiple: false
            },
            options: [
              { label: "Foo", value: "foo" },
              { label: "Bar", value: "bar" }
            ],
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "Byte Size",
          commonStandardId: 'byte_size',
          required: false,
          enabled: true,
          content: {
            type: "numberWithContext",
            attributes: {
              min: 0,
              step: 1,
              context: [
                { label: 'KB (kilobytes)', value: 'kb' },
                { label: 'MB (megabytes)', value: 'mb' }
              ]
            },
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "My Custom Field",
          required: false,
          enabled: true,
          content: {
            type: "text",
            attributes: { maxLength: 255 },
            meta: { schemaVersion: "1.0" }
          }
        },
        {
          heading: "Repositories",
          commonStandardId: 'host',
          required: false,
          enabled: true,
          preferences: [
           { label: "Repository 1", value: "https://repo.example.com/1" },
           { label: "Repository 2", value: "https://repo.example.com/2" }
          ],
          content: {
            type: "repositorySearch",
            attributes: {
              label: "Repository Search",
              help: "Search for a repository",
            },
            graphQL: {
              query: "query Repositories($term: String, $keywords: [String!], $repositoryType: String, $paginationOptions: PaginationOptions){ repositories(term: $term, keywords: $keywords, repositoryType: $repositoryType, paginationOptions: $paginationOptions) { totalCount currentOffset limit hasNextPage hasPreviousPage availableSortFields items { id name uri description website keywords repositoryTypes } } }",
              displayFields: [
                {
                  propertyName: "name",
                  label: "Name"
                },
                {
                  propertyName: "description",
                  label: "Description"
                },
                {
                  propertyName: "website",
                  label: "Website"
                },
                {
                  propertyName: "keywords",
                  label: "Subject Areas"
                }
              ],
              answerField: "uri",
              responseField: "repositories.items",
              variables: [
                {
                  type: "string",
                  name: "term",
                  label: "Search term",
                  minLength: 2
                },
                {
                  type: "string",
                  name: "repositoryType",
                  label: "Repository Type"
                },
                {
                  type: "string",
                  name: "keywords",
                  label: "Subject Areas"
                }
              ],
            },
            meta: { schemaVersion: "1.0" }
          }
        }
      ],
      meta: { schemaVersion: "1.0" }
    };

    expect(() => ResearchOutputTableQuestionSchema.parse(validResearchOutputTableQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid ResearchOutputTableQuestion object", () => {
    const invalidResearchOutputTableQuestion = {
      type: "researchOutputTable",
      columns: [
        {
          heading: "Title",
          commonStandardId: 'title',
          content: {
            type: "invalid",
            meta: {
              schemaVersion: "1.0"
            }
          }
        }
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => ResearchOutputTableQuestionSchema.parse(invalidResearchOutputTableQuestion)).toThrow();
  });
});

