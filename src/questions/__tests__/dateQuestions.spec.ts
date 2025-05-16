import { DatePickerQuestion, DateRangeQuestion } from "../dateQuestions";

describe("DatePickerQuestion", () => {
  it("should validate a valid DatePickerQuestion object", () => {
    const validDatePicker = {
      type: "datePicker",
      attributes: {
        max: "2023-12-31",
        min: "2023-01-01",
        step: 1,
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DatePickerQuestion.parse(validDatePicker)).not.toThrow();
  });

  it("should throw an error for an invalid DatePickerQuestion object", () => {
    const invalidDatePicker = {
      type: "datePicker",
      attributes: {
        max: 123, // Invalid type for max
        min: "2023-01-01",
        step: "one", // Invalid type for step
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DatePickerQuestion.parse(invalidDatePicker)).toThrow();
  });

  it("should allow optional attributes in DatePickerQuestion", () => {
    const validDatePicker = {
      type: "datePicker",
      attributes: {},
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => DatePickerQuestion.parse(validDatePicker)).not.toThrow();
  });
});

describe("DateRangeQuestion", () => {
  it("should validate a valid DateRangeQuestion object", () => {
    const validDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "datePicker",
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
          type: "datePicker",
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

    expect(() => DateRangeQuestion.parse(validDateRange)).not.toThrow();
  });

  it("should throw an error for an invalid DateRangeQuestion object", () => {
    const invalidDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "datePicker",
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
          type: "datePicker",
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

    expect(() => DateRangeQuestion.parse(invalidDateRange)).toThrow();
  });

  it("should require labels for start and end date pickers", () => {
    const invalidDateRange = {
      type: "dateRange",
      columns: {
        start: {
          type: "datePicker",
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
          type: "datePicker",
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

    expect(() => DateRangeQuestion.parse(invalidDateRange)).toThrow();
  });
});
