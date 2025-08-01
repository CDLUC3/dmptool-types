import { TableQuestionSchema } from "../tableQuestions";

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
