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
// First try resolving via the package export (works when installed from GitHub branch or npm)
function resolveSchemaPath(): string | undefined {
  // Try using Node's module resolution against the package export
  try {
    // require.resolve respects the "exports" map in package.json
    const resolved = require.resolve("@dmptool/types/schemas/dmp.schema.json");
    if (resolved && fs.existsSync(resolved)) {
      return resolved;
    }
    // If require.resolve found a path but it doesn't exist, log it for debugging
    console.warn(`[dmptool-types] require.resolve found path but it doesn't exist: ${resolved}`);
  } catch {
    // ignore and fall back to local paths below
  }

  // Fallbacks based on local file structure when running from source or built dist
  // This handles multiple installation scenarios:
  // 1. npm/published package with dist/schemas
  // 2. Source code with ts-node/ts-node-dev
  // 3. GitHub branch installation where dist is gitignored but schemas/ is committed
  const schemaCandidatePaths = [
    // When running compiled code from dist: dist/dmp/index.js -> dist/schemas/dmp.schema.json
    path.resolve(__dirname, "..", "schemas", "dmp.schema.json"),
    // When running from source with ts-node: src/dmp/index.ts -> compiled as dist/dmp/index.js -> schemas/dmp.schema.json at repo root
    path.resolve(__dirname, "..", "..", "schemas", "dmp.schema.json"),
    // When installed as node_module from GitHub: node_modules/@dmptool/types/dist/dmp/index.js
    // Go up to package root, then into schemas: dist/dmp -> dist -> package_root -> schemas
    path.resolve(__dirname, "..", "..", "..", "schemas", "dmp.schema.json"),
  ];

  // Remove duplicates while preserving order
  const uniquePaths = Array.from(new Set(schemaCandidatePaths));
  return uniquePaths.find((candidate) => fs.existsSync(candidate));
}

const RDA_COMMON_STANDARD_JSON_FILE = resolveSchemaPath();

if (!RDA_COMMON_STANDARD_JSON_FILE) {
  const attemptedPaths = [
    path.resolve(__dirname, "..", "schemas", "dmp.schema.json"),
    path.resolve(__dirname, "..", "..", "schemas", "dmp.schema.json"),
    path.resolve(__dirname, "..", "..", "..", "schemas", "dmp.schema.json"),
  ];
  throw new Error(
    `Unable to locate dmp.schema.json. Current __dirname: ${__dirname}. Attempted paths: ${attemptedPaths.join(", ")}`
  );
}

// Double-check the file exists before trying to read it
if (!fs.existsSync(RDA_COMMON_STANDARD_JSON_FILE)) {
  throw new Error(
    `Schema file path was resolved to ${RDA_COMMON_STANDARD_JSON_FILE} but the file does not exist. This may indicate an issue with the package installation or build process.`
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
