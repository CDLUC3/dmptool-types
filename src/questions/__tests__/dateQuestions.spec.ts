import { DateQuestionSchema, DateRangeQuestionSchema } from "../dateQuestions";

describe("DateQuestion", () => {
  it("should validate a valid DateQuestion object", () => {
    const validDate = {
      type: "date",
      attributes: {
        max: "2023-12-31",
        min: "2023-01-01",
        step: 1,
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateQuestionSchema.parse(validDate)).not.toThrow();
  });

  it("should throw an error for an invalid DateQuestion object", () => {
    const invalidDate = {
      type: "date",
      attributes: {
        max: 123, // Invalid type for max
        min: "2023-01-01",
        step: "one", // Invalid type for step
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateQuestionSchema.parse(invalidDate)).toThrow();
  });

  it("should allow optional attributes in DateQuestion", () => {
    const validDate = {
      type: "date",
      attributes: {},
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateQuestionSchema.parse(validDate)).not.toThrow();
  });
});

describe("DateRangeQuestion", () => {
  it("should validate a valid DateRangeQuestion object", () => {
    const validDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "date",
          attributes: {
            label: "Start Date",
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
        end: {
          type: "date",
          attributes: {
            label: "End Date",
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateRangeQuestionSchema.parse(validDateRange)).not.toThrow();
  });

  it("should throw an error for an invalid DateRangeQuestion object", () => {
    const invalidDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "date",
          attributes: {
            label: "Start Date",
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
        end: {
          type: "date",
          attributes: {
            label: 123, // Invalid type for label
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateRangeQuestionSchema.parse(invalidDateRange)).toThrow();
  });

  it("should require labels for start and end dates", () => {
    const invalidDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "date",
          attributes: {
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
        end: {
          type: "date",
          attributes: {
            label: "End Date",
            max: "2023-12-31",
            min: "2023-01-01",
            step: 1,
          },
          meta: {
            schemaVersion: "1.0"
          }
        },
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DateRangeQuestionSchema.parse(invalidDateRange)).toThrow();
  });
});
