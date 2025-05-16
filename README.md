# dmptool-types

This package provides Types, Zod schemas and JSON schemas to aide in integrations with the DMP Tool.

## Usage

To run tests: `npm run test`

To run linter checks: `npm run lint`

To just generate JSON schemas from the Zod schemas: `npm run generate`

To build the Types, Zod schemas and JSON schemas all at once: `npm run build`

To publish changes:
- Increment the `version` in `package.json`
- Run `npm login` and login to you npm account
- Run `npm publish --access public`

To view the current published version run `npm view @dmptool/types`. You should see something like this:
```
@dmptool/types@1.0.0 | MIT | deps: 3 | versions: 1
TypeScript types for DMPTool

dist
.tarball: https://registry.npmjs.org/@dmptool/types/-/types-1.0.0.tgz
.shasum: e9b4200e487ed2e4ae0ef342ca75f90bf6bdd335
.integrity: sha512-wFhYELbbM17VGx7REVaDXi0TJKMXnGJRiwszfXqnKY46QeQvPnktwgYDDuuWaupFZV1jJaSq7cfs6vK1oHeOyA==
.unpackedSize: 286.4 kB

dependencies:
fs: ^0.0.1-security         zod-to-json-schema: ^3.24.5 zod: ^3.24.4                

maintainers:
- npm-user-name <email-address>

dist-tags:
latest: 1.0.0 

published 6 minutes ago by npm-user-name <email-address>
```

## Types/Schemas

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

### Coming soon

RDA Common Standard for DMPs

DMP Tool specific extensions to the RDA Common Standard for DMPs
