import { describe, it, expect } from "@jest/globals";
import {
  CheckboxesQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema,
  CheckboxesQuestionType,
  RadioButtonsQuestionType,
  SelectBoxQuestionType,
  BooleanQuestionSchema,
  MultiselectBoxQuestionType,
  MultiselectBoxQuestionSchema
} from "../optionBasedQuestions";

describe("BooleanQuestion", () => {
  it('optional fields should throw an error if the value is null', () => {
    const invalidBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: null, // Invalid value
      },
    };
    expect(() => BooleanQuestionSchema.parse(invalidBooleanQuestion)).toThrow();
  });

  it("should validate a valid BooleanQuestion", () => {
    const validBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        label: "Is it true?",
        value: true
      }
    };
    expect(() => BooleanQuestionSchema.parse(validBooleanQuestion)).not.toThrow();
  });

  it("should invalidate an invalid BooleanQuestion", () => {
    const invalidBooleanQuestion = {
      type: "boolean",
      meta: {
        schemaVersion: "1.0",
      },
      attributes: {
        checked: "true", // Invalid type
      },
    };
    expect(() => BooleanQuestionSchema.parse(invalidBooleanQuestion)).toThrow();
  });
});

describe("CheckboxesQuestion", () => {
  it("should validate a valid CheckboxesQuestion object", () => {
    const validCheckboxesQuestion: CheckboxesQuestionType = {
      type: "checkBoxes",
      attributes: {
        label: "Fruits",
        help: "Select all fruits you like",
      },
      options: [
        {
          label: "Apple",
          value: "apple",
          selected: true,
        },
        {
          label: "Banana",
          value: "banana",
          selected: false,
        },
      ],
      meta: {
        schemaVersion: "1.0"
      },
      showCommentField: false
    };

    expect(() => CheckboxesQuestionSchema.parse(validCheckboxesQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid CheckboxesQuestion object", () => {
    const invalidCheckboxesQuestion = {
      type: "checkBoxes",
      attributes: {
        label: "Has an apple?",
        help: "Whether or not you have an apple in your fridge.",
      },
      options: [
        {
          label: "Apple",
          value: "apple",
          selected: "true", // Invalid type for checked
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => CheckboxesQuestionSchema.parse(invalidCheckboxesQuestion)).toThrow();
  });
});

describe("RadioButtonsQuestion", () => {
  it("should validate a valid RadioButtonsQuestion object", () => {
    const validRadioButtonsQuestion: RadioButtonsQuestionType = {
      type: "radioButtons",
      attributes: {
        label: "Fruits",
        help: "Select all fruits you like",
      },
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      },
      showCommentField: false
    };

    expect(() => RadioButtonsQuestionSchema.parse(validRadioButtonsQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid RadioButtonsQuestion object", () => {
    const invalidRadioButtonsQuestion = {
      type: "radioButtons",
      options: [
        {
          label: "Male",
          value: "male"
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => RadioButtonsQuestionSchema.parse(invalidRadioButtonsQuestion)).toThrow();
  });
});

describe("SelectBoxQuestion", () => {
  it("should validate a valid SelectBoxQuestion object", () => {
    const validSelectBoxQuestion: SelectBoxQuestionType = {
      type: "selectBox",
      attributes: {
        label: "Fruits",
        help: "Select all fruits you like",
        multiple: false,
      },
      options: [
        {
          label: "USA",
          value: "us",
        },
        {
          label: "Canada",
          value: "ca",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      },
      showCommentField: false
    };

    expect(() => SelectBoxQuestionSchema.parse(validSelectBoxQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid SelectBoxQuestion object", () => {
    const invalidSelectBoxQuestion = {
      type: "selectBox",
      questionText: "Select your country",
      options: [
        {
          label: "USA",
          value: "us"
        },
      ],
      attributes: {
        multiple: "true", // Invalid type for multiple
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => SelectBoxQuestionSchema.parse(invalidSelectBoxQuestion)).toThrow();
  });
});


describe("MultiselectBoxQuestion", () => {
  it("should validate a valid MultiselectBoxQuestion object", () => {
    const validSelectBoxQuestion: MultiselectBoxQuestionType = {
      type: "multiselectBox",
      attributes: {
        label: "Fruits",
        help: "Select all fruits you like",
        multiple: true,
      },
      options: [
        {
          label: "USA",
          value: "us",
        },
        {
          label: "Canada",
          value: "ca",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      },
      showCommentField: false
    };

    expect(() => MultiselectBoxQuestionSchema.parse(validSelectBoxQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid MultiselectBoxQuestion object", () => {
    const invalidSelectBoxQuestion = {
      type: "multiselectBox",
      questionText: "Select your country",
      options: [
        {
          label: "USA",
          value: "us"
        },
      ],
      attributes: {
        multiple: "true", // Invalid type for multiple
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => MultiselectBoxQuestionSchema.parse(invalidSelectBoxQuestion)).toThrow();
  });
});

describe("Option descriptions", () => {
  it("should accept and preserve an optional description on options", () => {
    const selectWithDescription: SelectBoxQuestionType = {
      type: "selectBox",
      attributes: { multiple: false },
      options: [
        { label: "Data paper", value: "data-paper", description: "A published description of a dataset" },
      ],
      meta: { schemaVersion: "1.0" }
    };

    const parsed = SelectBoxQuestionSchema.parse(selectWithDescription);
    expect(parsed.options[0].description).toBe("A published description of a dataset");
  });
});

