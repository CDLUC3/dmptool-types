# dmptool-types

This package provides Types, Zod schemas and JSON schemas to aide in integrations with the DMP Tool.

[Zod](https://www.npmjs.com/package/zod) schemas and Typescript Types can be found in the `src/` directory and JSON schemas can be found in the `schemas/` directory.

The current version of the schemas can always be found in `CURRENT_SCHEMA_VERSION`. You will need to include the version is any object you create using the types in this file.

Naming conventions:
- Zod schemas do not include the word `Type` (e.g. `BooleanQuestion`, `CheckboxesAnswer`)
- Types include the word `Type` (e.g. `BooleanQuestionType`, `CheckboxesAnswerType`)

## DMP Template Support

The `QuestionFormatsEnum` contains a list of all the possible question types currently supported by the DMP Tool. These values correspond with the `type` property of a question type. For example, the `BooleanQuestion` has `type: 'boolean'` and the `SelectBoxQuestion` has `type: 'selectBoxes'`.

The available question schemas/types are:
- `AnyQuestion` A Union of all the question types
- `AnyTableColumnQuestion` A subset of `AnyQuestion`. All of the question types that can be part of a table
- `AffiliationSearch` A typeahead style field that allows the user to search for affiliations.
- `BooleanQuestion` A Yes/No True/False question.
- `CheckboxesQuestion` A question type that supports an array of `option` objects. The user may "check" multiple options.
- `CurrencyQuestion` A number field that supports the defintiion of a `denomination`. 
- `DateQuestion` A date field. Supports `YYYY-MM-DD` format.
- `DateRangeQuestion` A series of 2 date fields. Meant to capture "From" and "To" or "Start" and "End" dates.
- `EmailQuestion` An email address. Supports multiple emails that are comma separated.
- `LicenseSearch` A GraphQL enabled question to search for relevant Licenses
- `MetadataStandardSearch` A GraphQL enabled question to search for relevant Metadata Standards
- `MultiselectBoxQuestion` A select box that allows for multiple selections
- `NumberQuestion` A numeric field. Supports both integers and floats.
- `NumberRangeQuestion` A series of 2 number fields. Meant to capture "From" and "To" or "Min" and "Max" numbers.
- `RadioButtonsQuestion` A question type that supports an array of `option` objects. The user may "select" a single option.
- `RepositorySearch` A GraphQL enabled question to search for relevant Repositories
- `ResearchOutputsTable` A table/collection of questions to allow for users to define title, description, repositories, license, etc. for multiple research outputs.
- `SelectBoxQuestion` A drop down select box that supports an array of `option` objects. A `multiple` flag can be set to allow multi-select.
- `TableQuestion` A table question type. Each column in the table can be any one of the `AnyTableColumnQuestion` types.
- `TextQuestion` A simple text field
- `TextAreaQuestion` A text area field. If the `isRichText` flag is set, the user should see a WYSIWYG editor.
- `URLQuestion` A simple URL field.

## DMP Support

Each of the question types above has a corresponding answer. The `type` in each answer type must match the `type` of the related question. For example `BooleanAnswer` has `type: 'boolean'` and and the `SelectBoxAnswer` has `type: 'checkboxes'`.

The available answer schemas/types are:
- `AnyAnswer` A Union of all the answer types
- `AnyTableColumnAnswer` A subset of `AnyAnswer`. All of the answer types that can be part of a table
- `AffiliationSearch` The URI of the selected affiliation.
- `BooleanAnswer` A Yes/No True/False answer.
- `CheckboxesAnswer` A answer type that supports an array of `option` objects. The user may "check" multiple options.
- `CurrencyAnswer` A number field that supports the defintiion of a `denomination`. 
- `DateAnswer` A date field. Supports `YYYY-MM-DD` format.
- `DateRangeAnswer` A series of 2 date fields. Meant to capture "From" and "To" or "Start" and "End" dates.
- `EmailAnswer` An email address. Supports multiple emails that are comma separated.
- `LicenseSearch` A license name and URL identifier
- `MetadataStandardSearch` An array of names and URL identifiers for metadata standards
- `MultiselectAnswer` An array of `option` objects each containing the value of a selected entry.
- `NumberAnswer` A numeric field. Supports both integers and floats.
- `DateRangeAnswer` A series of 2 numbers. Meant to capture "From" and "To" or "Start" and "End".
- `RadioButtonsAnswer` A answer type that supports an array of `option` objects. The user may "select" a single option.
- `RepositorySearch` An array of names and URL identifiers for a repositories
- `ResearchOutputsTable` A table/collection of answers to allow for users to define title, description, repositories, license, etc. for multiple research outputs.
- `SelectBoxAnswer` The value the user selected.
- `TableAnswer` A table answer type. Each column in the table can be any one of the `AnyTableColumnAnswer` types.
- `TextAnswer` A simple text field
- `TextAreaAnswer` A text area field. If the `isRichText` flag is set, the user should see a WYSIWYG editor.
- `URLAnswer` A simple URL field.

### Coming soon

RDA Common Standard for DMPs

DMP Tool specific extensions to the RDA Common Standard for DMPs

## Usage

Add the DMP Tool types to your `package.json` by running `npm add @dmptool/types`

Use the provided enum for the list of available question/answer formats.
```
import { QuestionFormatsEnum } from "../question";

// Display all of the available Question formats
console.log(Object.values(QuestionFormatsEnum));
```

Fetch the usage information for a given question format. This can be used to present your users determine which question format to use:
```
import { 
  QuestionFormatsEnum, 
  QuestionFormatsUsage, 
  QuestionFormatsUsageInterface 
} from "@dmptool/types";

// Infer the Types for all of the question formats
type QuestionType = z.infer<typeof QuestionFormatsEnum>

// List all of the usage information for each question format
// e.g. { 
//        title: 'Text Field', 
//        usageDecription: 'For questions that require short, simple answers.' 
//      }
const name: 'text';
const usage: QuestionFormatsUsageInterface = QuestionFormatsUsage[name as QuestionType];

console.log(usage);
```

Validate a question's JSON
```
import { QuestionSchemaMap } from "@dmptool/types";

const json = {
  type: 'email',
  attributes: {
    maxLength: 2000,
    multiple: true
  },
  meta: {
    echemaVersion: '1.0'
  }
};

// First verify that the question format (`type`) is a known format.
if (Object.keys(QuestionSchemaMap).includes(json['type'])) {
  // Validate the json against the Zod schema and if valid, set the questionType
  try {
    const result = QuestionSchemaMap[json['type']]?.safeParse(json);
    if (result && !result.success) {
      // If there are validation errors, add them to the errors object
      console.log(result.error.errors);
    }
  } catch (e) {
    console.log(e.message);
  }
}
```

Fetch the default JSON for a given question format:
```
import { 
  AnyQuestionType,
  QuestionFormatsEnum, 
  QuestionSchemaMap,  
} from "@dmptool/types";

// Infer the Types for all of the question formats
type QuestionType = z.infer<typeof QuestionFormatsEnum>

// Fetch the Zod schema for the question format and then parse it with
// only the question format type as an input
// e.g. {
//        type: 'text',
//        attributes: {
//          maxLength: 255,
//        },
//        meta: { 
//          schemaVersion: CURRENT_SCHEMA_VERSION 
//        },
//      }
const name: 'text';
const schema: z.ZodTypeAny = QuestionSchemaMap[name as QuestionType];
const parsedSchema: AnyQuestionType = schema.parse({ type: name });

console.log(parsedSchema);
```

Fetch the default JSON for a given answer format:
```
import { 
  AnyAnswerType,
  AnswerSchemaMap,
  QuestionFormatsEnum,
} from "@dmptool/types";

// Infer the Types for all of the question formats
type AnswerType = z.infer<typeof QuestionFormatsEnum>

// Fetch the Zod schema for the question format and then parse it with
// only the question format type as an input
// e.g. {
//        type: 'text',
//        answer: '',
//        meta: { 
//          schemaVersion: CURRENT_SCHEMA_VERSION 
//        },
//      }
const name: 'text';
const schema: z.ZodTypeAny = AnswerSchemaMap[name as AnswerType];
const parsedSchema: AnyAnswerType = schema.parse({ type: name });

console.log(parsedSchema);
```

Example Zod error thrown while parsing:
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
