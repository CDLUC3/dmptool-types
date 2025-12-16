# dmptool-types CHANGELOG

# v2.1.0
- Added script to fetch the latest RDA Common Standard JSON schema
- Added logic to generate types from the RDA Common Standard JSON schema
- Added DMP Tool Extensions for DMP schemas and types
- Added tests for RDA Common Standard schema and DMP Tool extensions

# v1.3.0
- Upgrade Zod to version 4
- Removed `zod-to-json-schema` as this is now a part of Zod 4
- Updated `generateSchemas` script to use the new built-in Zod JSON schema generation
- Updated all Zod schemas to define both a Schema and a Default

- Fixed issue with researchOutputTable preferences being filtered out in validation
- Added CONTRIBUTING.md, CODE_OF_CONDUCT.md and PULL_REQUEST_TEMPLATE.md
# v1.2.4
- Added NumberWithContext question and answer types to support numbers with additional context (e.g. units)
- Added LicenseSearch, MetadataStandardSearch and RepositorySearch question and answer types
- Added ResearchOutputTable question and answer types

# v1.2.3
- Added Trivy scanning to GitHub Actions workflow
- Added Trivy script files and new scripts in package.json 
- Removed `fs` from package.json because `0.0.1-security` is compromised and `fs` is a built-in Node module anyway
- Pegged all other dependencies to exact versions in package.json
- Added `default` property to schemas to allow setting a default selected option
- Updated `OptionAnswerType` to allow for multiple selections
- Updated `TableAnswerType` to allow for an array of answers for each row
- Updated `TableQuestionType` to allow for an array of questions for each column

## v1.1.0

- Added `QuestionTypeMap` and `AnswerTypeMap` that maps the `type` label to the corresponding Type
- Refactored `primitiveQuestions` into separate `numberQuestions` and `textQuestions`
- Added `label` and `help` to the base attributes for every question type
- Moved `denomination` from `meta` to `attributes` in the currency question type
- Fixed some issues with the Zod structure that was causing fields like `min` and `max` on the number question type to be lost
- Refactored Option and Range question types so that the nested objects are just the `attributes` properties

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

