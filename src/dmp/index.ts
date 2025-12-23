import fs from "fs";
import path from "path";
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
const schemaCandidatePaths = [
  path.resolve(__dirname, "..", "schemas", "dmp.schema.json"),
  path.resolve(__dirname, "..", "..", "schemas", "dmp.schema.json"),
];

const RDA_COMMON_STANDARD_JSON_FILE = schemaCandidatePaths.find((candidate) =>
  fs.existsSync(candidate)
);

if (!RDA_COMMON_STANDARD_JSON_FILE) {
  throw new Error(
    "Unable to locate dmp.schema.json. Looked in dist/schemas and repo-level schemas."
  );
}

// Ignoring ESLint here because it doesn't like that we're only using jsonSchema as a Type
// but that's exactly what we want to do.
const jsonSchema = JSON.parse(fs.readFileSync(RDA_COMMON_STANDARD_JSON_FILE, "utf8"));
export const RDACommonStandardDMPJSONSchema = jsonSchema;

// The version of the DMP that conforms to the RDA Common Standard (without our extensions)
export type RDACommonStandardDMPType = FromSchema<typeof jsonSchema>;

// The version of the DMP that conforms to the RDA Common Standard (with our extensions)
export type DMPToolDMPType = RDACommonStandardDMPType & ExtensionType;
export const ExtensionJSONSchema = z.toJSONSchema(ExtensionSchema);
