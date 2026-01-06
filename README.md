# dmptool-types

This package provides Types, Zod schemas and JSON schemas to aide in integrations with the DMP Tool.

[Zod](https://www.npmjs.com/package/zod) schemas and Typescript Types can be found in the `src/` directory and JSON schemas can be found in the `schemas/` directory.

The current version of the schemas can always be found in `CURRENT_SCHEMA_VERSION`. You will need to include the version is any object you create using the types in this file.

Naming conventions:
- Zod schemas include the word `Schema` (e.g. `BooleanQuestionSchema`, `CheckboxesAnswerSchema`)
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

### Pre-testing changes from dmptool-types in the backend or frontend

It's possible to test changes so you don't have to publish the new version
of  `@dmptool/types` to npm until you know the changes are working as expected. You
may also fix tests or make other changes to the backend or frontend to use the new types
schema if it causes breaking changes.

in the existing package.json it looks like the following (most of the file omitted):

```json
{
  "dependencies": {
    "@dmptool/types": "2.0.0",
  }
}
```

To test frontend or backed locally with new types, change the version to point to the
GitHub repo instead. You should have committed and pushed your changes to a branch in
the dmptool-types repo before doing this.

While you can put a branch name after the `#` here, it's better to use a specific
commit hash since it makes it more clear for caching algorithms that code has changed
(while a branch name may stay the same, even with changes to the branch). You can
see the latest commit hash by doing `git log -1` in the dmptool-types repo
(be sure that commit is on github!).

Example (most of the file omitted):

```json
{
  "dependencies": {
    "@dmptool/types": "github:CDLUC3/dmptool-types#3804909b252dcf3af4487438ed9321d6a06decd1",
  }
}
```

After changing you need to run `npm install` again to update the dependency and probably need
to stop docker and do `docker compose up` again (if you're using docker for local development).

This may also help you decide how to set SEMVER version number as a MAJOR, MINOR or PATCH change
when you go to publish the types package to NPM depending on if breaking existing code.

After you've tested your changes and are happy with them, be sure to change the package.json
`@dmptool/types` back to the previous npm repository and version. After you've published
the types to NPM (see section below), you can then update the backend and frontend package.json files
to use the new version from NPM.

It's tricky to manage these changes since they potentially may require changes to
three different repositories in parallel since likely the types changes will at
least require version number changes to be published to NPM and then the frontend
and backend will need to update their dependencies to use the new version of the
types package, also.

Be careful with testing locally since if other people are working in parallel with
types or other backend/frontend changes then the compatibility may change if you're pulling
latest changes in only some of the repos from upstream, but not others.

Problems may not be obvious or easy to figure out when things get out of sync and
you can waste a lot of time trying to figure out why something isn't working.
One way to keep things in sync is to create parallel feature branches on all three
repos when starting the work,so the changes stay the same and can be tested together
and act like an atomic unit rather than some parts drifting out of sync. If you pull
in latest changes from upstream on one repo, be sure to do it on all three repos.


### To publish changes:
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

After publishing changes you'll need to update the `@dmptool/types` dependency in both the
backend and frontend repos to use the new version number and run `npm install` again.
