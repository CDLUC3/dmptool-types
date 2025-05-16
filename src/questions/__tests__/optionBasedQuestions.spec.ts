import { describe, it, expect } from "@jest/globals";
import {
  CheckboxesQuestion,
  RadioButtonsQuestion,
  SelectBoxQuestion,
  CheckboxesQuestionType,
  RadioButtonsQuestionType,
  SelectBoxQuestionType,
} from "../optionBasedQuestions";

describe("CheckboxesQuestion", () => {
  it("should validate a valid CheckboxesQuestion object", () => {
    const validCheckboxesQuestion: CheckboxesQuestionType = {
      type: "checkBoxes",
      options: [
        {
          type: "option",
          attributes: {
            label: "Apple",
            value: "apple",
            checked: true,
          },
        },
        {
          type: "option",
          attributes: {
            label: "Banana",
            value: "banana",
          },
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => CheckboxesQuestion.parse(validCheckboxesQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid CheckboxesQuestion object", () => {
    const invalidCheckboxesQuestion = {
      type: "checkBoxes",
      options: [
        {
          type: "option",
          attributes: {
            label: "Apple",
            value: "apple",
            checked: "true", // Invalid type for checked
          },
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => CheckboxesQuestion.parse(invalidCheckboxesQuestion)).toThrow();
  });
});

describe("RadioButtonsQuestion", () => {
  it("should validate a valid RadioButtonsQuestion object", () => {
    const validRadioButtonsQuestion: RadioButtonsQuestionType = {
      type: "radioButtons",
      options: [
        {
          type: "option",
          attributes: {
            label: "Male",
            value: "male",
            selected: true,
          },
        },
        {
          type: "option",
          attributes: {
            label: "Female",
            value: "female",
          },
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => RadioButtonsQuestion.parse(validRadioButtonsQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid RadioButtonsQuestion object", () => {
    const invalidRadioButtonsQuestion = {
      type: "radioButtons",
      options: [
        {
          type: "option",
          attributes: {
            label: "Male",
            value: "male",
            selected: "true", // Invalid type for selected
          },
        },
      ],
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => RadioButtonsQuestion.parse(invalidRadioButtonsQuestion)).toThrow();
  });
});

describe("SelectBoxQuestion", () => {
  it("should validate a valid SelectBoxQuestion object", () => {
    const validSelectBoxQuestion: SelectBoxQuestionType = {
      type: "selectBox",
      options: [
        {
          type: "option",
          attributes: {
            label: "USA",
            value: "usa",
            selected: true,
          },
        },
        {
          type: "option",
          attributes: {
            label: "Canada",
            value: "canada",
          },
        },
      ],
      attributes: {
        multiple: true,
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => SelectBoxQuestion.parse(validSelectBoxQuestion)).not.toThrow();
  });

  it("should throw an error for an invalid SelectBoxQuestion object", () => {
    const invalidSelectBoxQuestion = {
      type: "selectBox",
      questionText: "Select your country",
      options: [
        {
          type: "option",
          attributes: {
            label: "USA",
            value: "usa",
            selected: "true", // Invalid type for selected
          },
        },
      ],
      attributes: {
        multiple: "true", // Invalid type for multiple
      },
      meta: {
        schemaVersion: "1.0"
      }
    };

    expect(() => SelectBoxQuestion.parse(invalidSelectBoxQuestion)).toThrow();
  });
});
