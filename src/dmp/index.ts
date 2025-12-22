import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { FromSchema } from "json-schema-to-ts";
import { ExtensionSchema, ExtensionType } from "./extension";

// The RDA Common Standard for DMPs JSON schema is automatically downloaded by
// scripts/importRDACommonStandard.ts script. This file fetches the specified
// version of the schema and places it into the schemas/ directory.
//
// At this time, there is a PR to add support for converting a JSON Schema into
// a Zod schema, but it is not there yet.
//
// Convert the downloaded JSON schema into types
const RDA_COMMON_STANDARD_JSON_FILE = '../../schemas/dmp.schema.json';

// Ignoring ESLint here because it doesn't like that we're only using jsonSchema as a Type
// but that's exactly what we want to do.
const schemaPath = path.resolve(__dirname, RDA_COMMON_STANDARD_JSON_FILE);

const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
export const RDACommonStandardDMPJSONSchema = jsonSchema;

// The version of the DMP that conforms to the RDA Common Standard (without our extensions)
export type RDACommonStandardDMPType = FromSchema<typeof jsonSchema>

// The version of the DMP that conforms to the RDA Common Standard (with our extensions)
export type DMPToolDMPType = RDACommonStandardDMPType & ExtensionType;
export const ExtensionJSONSchema = z.toJSONSchema(ExtensionSchema);
