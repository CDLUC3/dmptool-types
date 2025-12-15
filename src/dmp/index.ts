import fs from "fs";
import { FromSchema } from "json-schema-to-ts";
import {ExtensionType} from "./extension";

// The RDA Common Standard for DMPs JSON schema is automatically downloaded by
// scripts/importRDACommonStandard.ts script. This file fetches the specified
// version of the schema and places it into the schemas/ directory.
//
// At this time, there is a PR to add support for converting a JSON Schema into
// a Zod schema, but it is not there yet.
//
// Convert the downloaded JSON schema into types
const RDA_COMMON_STANDARD_JSON_FILE = './schemas/dmp.schema.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jsonSchema = JSON.parse(fs.readFileSync(RDA_COMMON_STANDARD_JSON_FILE, 'utf8'));
export type RDACommonStandardDMP = FromSchema<typeof jsonSchema>

// Export our DMP Tool version of the RDA Common Standard with our extensions
export type DMPToolDMPType = RDACommonStandardDMP & ExtensionType;
