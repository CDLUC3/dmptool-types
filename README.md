# dmptool-types

This package provides Types, Zod schemas and JSON schemas to aide in integrations with the DMP Tool.

If you want to work with DMP Templates or Answers to template questions, the following :
  - CURRENT_SCHEMA_VERSION (the current version of the schemas)
  - QuestionTypesEnum (Contains the `type` for each Question/Answer below)
  - AnyQuestion & AnyAnswer (Union of all types below)
  - BooleanQuestion & Boolean Answer
  - CheckboxesQuestion & Checkboxes Answer
  - CurrencyQuestion & CurrencyAnswer
  - DatePickerQuestion & DatePickerAnswer
  - DateRangeQuestion & DateRangeAnswer
  - EmailQuestion & EmailAnswer
  - FilteredSearchQuestion & FilteredSearchAnswer
  - NumberQuestion & NumberAnswer
  - RadioButtonsQuestion & RadioButtonsAnswer
  - SelectBoxQuestion & SelectBoxAnswer
  - TableQuestion & TableAnswer
  - TextAreaQuestion & TextAreaAnswer
  - TextQuestion & TextAnswer
  - TypeaheadSearchQuestion & TypeaheadSearchAnswer
  - URLQuestion & URLAnswer

To run tests: `npm run test`

To run linter checks: `npm run lint`

To generate JSON schemas from the Zod schemas: `npm run generate`

To build the Types, Zod schemas and JSON schemas: `npm run build`
