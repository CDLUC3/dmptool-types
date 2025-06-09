# dmptool-types

This package provides Types, Zod schemas and JSON schemas to aide in integrations with the DMP Tool.

[Zod](https://www.npmjs.com/package/zod) schemas and Typescript Types can be found in the `src/` directory and JSON schemas can be found in the `schemas/` directory.

## Available Schemas/Types

The current version of the schemas can always be found in `CURRENT_SCHEMA_VERSION`. You will need to include the version is any object you create using the types in this file.

Naming conventions:
- Zod schemas do not include the word `Type` (e.g. `BooleanQuestion`, `CheckboxesAnswer`)
- Types include the word `Type` (e.g. `BooleanQuestionType`, `CheckboxesAnswerType`)

### DMP Template Support

The `QuestionTypesEnum` contains a list of all the possible question types currently supported by the DMP Tool. These values correspond with the `type` property of a question type. For example, the `BooleanQuestion` has `type: 'boolean'` and the `SelectBoxQuestion` has `type: 'checkboxes'`.

The available question schemas/types are:
- `AnyQuestion` A Union of all the question types
- `AnyTableColumnQuestion` A subset of `AnyQuestion`. All of the question types that can be part of a table
- `BooleanQuestion` A Yes/No True/False question.
- `CheckboxesQuestion` A question type that supports an array of `option` objects. The user may "check" multiple options.
- `CurrencyQuestion` A number field that supports the defintiion of a `denomination`. 
- `DateQuestion` A date field. Supports `YYYY-MM-DD` format.
- `DateRangeQuestion` A series of 2 date fields. Meant to capture "From" and "To" or "Start" and "End" dates.
- `EmailQuestion` An email address. Supports multiple emails that are comma separated.
- `FilteredSearchQuestion` A complex field that allows the user to enter a search term and filters. The field fires a graphQL query and allows the user to potentially select multiple results.
- `NumberQuestion` A numeric field. Supports both integers and floats.
- `RadioButtonsQuestion` A question type that supports an array of `option` objects. The user may "select" a single option.
- `SelectBoxQuestion` A drop down select box that supports an array of `option` objects. A `multiple` flag can be set to allow multi-select.
- `TableQuestion` A table question type. Each column in the table can be any one of the `AnyTableColumnQuestion` types.
- `TextAreaQuestion` A text area field. If the `isRichText` flag is set, the user should see a WYSIWYG editor.
- `TextQuestion` A simple text field
- `TypeaheadSearchQuestion` A complex question type that allows the user to type into a text field and fires off a graphQL query. The user can select a single result.
- `URLQuestion` A simple URL field.

### DMP Support

Each of the question types above has a corresponding answer. The `type` in each answer type must match the `type` of the related question. For example `BooleanAnswer` has `type: 'boolean'` and and the `SelectBoxAnswer` has `type: 'checkboxes'`.

The available answer schemas/types are:
- `AnyAnswer` A Union of all the answer types
- `AnyTableColumnAnswer` A subset of `AnyAnswer`. All of the answer types that can be part of a table
- `BooleanAnswer` A Yes/No True/False answer.
- `CheckboxesAnswer` A answer type that supports an array of `option` objects. The user may "check" multiple options.
- `CurrencyAnswer` A number field that supports the defintiion of a `denomination`. 
- `DateAnswer` A date field. Supports `YYYY-MM-DD` format.
- `DateRangeAnswer` A series of 2 date fields. Meant to capture "From" and "To" or "Start" and "End" dates.
- `EmailAnswer` An email address. Supports multiple emails that are comma separated.
- `FilteredSearchAnswer` A complex field that allows the user to enter a search term and filters. The field fires a graphQL query and allows the user to potentially select multiple results.
- `NumberAnswer` A numeric field. Supports both integers and floats.
- `RadioButtonsAnswer` A answer type that supports an array of `option` objects. The user may "select" a single option.
- `SelectBoxAnswer` A drop down select box that supports an array of `option` objects. A `multiple` flag can be set to allow multi-select.
- `TableAnswer` A table answer type. Each column in the table can be any one of the `AnyTableColumnAnswer` types.
- `TextAreaAnswer` A text area field. If the `isRichText` flag is set, the user should see a WYSIWYG editor.
- `TextAnswer` A simple text field
- `TypeaheadSearchAnswer` A complex answer type that allows the user to type into a text field and fires off a graphQL query. The user can select a single result.
- `URLAnswer` A simple URL field.

#### Coming soon

RDA Common Standard for DMPs

DMP Tool specific extensions to the RDA Common Standard for DMPs

## Usage

Add the DMP Tool types to your `package.json` by running `npm add @dmptool/types`

Once added, you can then import the Types and Zod shemas like this:
`import { BooleanQuestionSchema, BooleanQuestionType, CURRENT_SCHEMA_VERSION } from '@dmptool/types';`

// Use the available Type to help define the JSON object
const boolQ: BooleanQuestionType = {
  type: "boolean",
  attributes: {
    checked: true
  },
  meta: {
    schemaVersion: CURRENT_SCHEMA_VERSION
  }
}

// Use the Zod Schema to validate the JSON 
const isBoolQ = BooleanQuestionSchema.parse(boolQ);
console.log('isBoolQ', isBoolQ);

// Force an error to see (see below for what a Zod error message looks like)
try {
  BooleanQuestionSchema.parse(123);
} catch (e) {
  console.log(e.message);
}

// Use the Schema Maps to get the correct Schema for the specificed question type
try {
  // Validate the questionJSON against the Zod schema
  QuestionSchemaMap[boolQ.type]?.parse(boolQ);
} catch (e) {
  console.log(e.message);
}

// Use the Any unions to generically define a Question or Answer type
public questionJSON: AnyQuestionType;

// Use the QuestionTypesEnum to fetch a list of all the valid question types
console.log(QuestionTypeEnums);
```


Example Zod error:
```
ZodError: [
  {
    "code": "invalid_type",
    "expected": "object",
    "received": "number",
    "path": [],
    "message": "Expected object, received number"
  }
]
```

## Development

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
