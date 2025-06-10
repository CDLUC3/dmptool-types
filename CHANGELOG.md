# dmptool-types CHANGELOG

## v1.0.8

- Added `NumberRangeQuestionType` and `NumberRangeAnswerType`

## v1.0.7

- Added the `numberRange` question and answer types
- Renamed `datePicker` and `datePickerAnswer` to `date` and `dateAnswer`
- Updated Zod schemas so that `attributes` objects themselves are optional (unless they have a required property)
- Updated `tableQuestion` so that it includes a way to define column headings

## v1.0.6

- Initial Jest and ESLint config
- Zod packages
- DMP Template Question and Answer Zod schemas and derived Typescript types
- `generateSchemas.ts` script to generate JSON schemas from Zod
- README, CHANGELOG and LICENSE

