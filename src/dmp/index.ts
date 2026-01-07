import fs from "fs";
import { z } from "zod";
import { FromSchema } from "json-schema-to-ts";
import { ExtensionSchema } from "./extension";

// The RDA Common Standard for DMPs JSON schema is automatically downloaded by
// scripts/importRDACommonStandard.ts script. This file fetches the specified
// version of the schema and places it into the schemas/ directory.
//
// At this time, there is a PR to add support for converting a JSON Schema into
// a Zod schema, but it is not there yet.
//
// Convert the downloaded JSON schema into types
const RDA_COMMON_STANDARD_JSON_FILE = './schemas/dmp.schema.json';

// Ignoring ESLint here because it doesn't like that we're only using jsonSchema as a Type
// but that's exactly what we want to do.
const jsonSchema = JSON.parse(fs.readFileSync(RDA_COMMON_STANDARD_JSON_FILE, 'utf8'));
export const RDACommonStandardDMPJSONSchema = jsonSchema;

// The version of the DMP that conforms to the RDA Common Standard (without our extensions)
export type RDACommonStandardDMPType = FromSchema<typeof jsonSchema>

// The DMP Tool extensions to the RDA Common Standard
export type DMPToolExtensionType = z.infer<typeof ExtensionSchema>;
export const DMPToolExtensionSchema = ExtensionSchema;
export const ExtensionJSONSchema = z.toJSONSchema(ExtensionSchema);

// Get the top level `dmp` object from the RDA Common Standard DMP and merge it with the DMP Tool extensions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RDAInner = RDACommonStandardDMPType extends { dmp: infer T } ? T : any;
type MergedDMP = RDAInner & DMPToolExtensionType;

// Export the merged DMP as a type
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DMPToolDMPType = {
  dmp: MergedDMP;
};
