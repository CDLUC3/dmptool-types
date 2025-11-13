import {
  TableQuestionSchema,
  ResearchOutputTableQuestionSchema
} from "../tableQuestions";

describe("TableQuestionSchema", () => {
  it("should validate a valid TableQuestion object", () => {
    const validTableQuestion = {
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
              label: "Age",
              help: "Enter your age",
              min: 18,
              max: 65,
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
          required: true,
          enabled: true,
          content: {
            type: "text",
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "Output Type",
          required: true,
          enabled: true,
          content: {
            type: "selectBox",
            attributes: {
              multiple: false
            },
            meta: {
              schemaVersion: "1.0"
            }
          }
        },
        {
          heading: "Byte Size",
          required: false,
          enabled: true,
          content: {
            type: "numberWithContext",
            attributes: {
              min: 0,
              step: 1,
              context: [
                { label: 'bytes', value: 'bytes' },
                { label: 'KB (kilobytes)', value: 'kb' },
                { label: 'MB (megabytes)', value: 'mb' },
                { label: 'GB (gigabytes)', value: 'gb' },
                { label: 'TB (terabytes)', value: 'tb' },
                { label: 'PB (petabytes)', value: 'pb' }
              ]
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

    expect(() => ResearchOutputTableQuestionSchema.parse(validResearchOutputTableQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid ResearchOutputTableQuestion object", () => {
    const invalidResearchOutputTableQuestion = {
      type: "researchOutputTable",
      columns: [
        {
          heading: "Title",
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

