import { describe, it, expect } from "@jest/globals";
import {
  CheckboxesQuestionSchema,
  RadioButtonsQuestionSchema,
  SelectBoxQuestionSchema,
  CheckboxesQuestionType,
  RadioButtonsQuestionType,
  SelectBoxQuestionType,
} from "../optionBasedQuestions";

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
          checked: true,
        },
        {
          label: "Banana",
          value: "banana",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
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
          checked: "true", // Invalid type for checked
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
          selected: true,
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => RadioButtonsQuestionSchema.parse(validRadioButtonsQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid RadioButtonsQuestion object", () => {
    const invalidRadioButtonsQuestion = {
      type: "radioButtons",
      options: [
        {
          label: "Male",
          value: "male",
          selected: "true", // Invalid type for selected
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
        multiple: true,
      },
      options: [
        {
          label: "USA",
          value: "us",
          selected: true,
        },
        {
          label: "Canada",
          value: "ca",
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
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
          value: "us",
          selected: "true", // Invalid type for selected
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
