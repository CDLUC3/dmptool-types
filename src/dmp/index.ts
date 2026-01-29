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

// Define the current version of the RDA Common Standard. This will be used to
// mark DMP Tool extension records with the version of the RDA Common Standard
// that the DMP conforms to.
//
// TODO: For some reason, Zod's `z.toJSONSchema(ExtensionSchema)` below is unable
//       to work with a reference to this constant (or any variable really and
//       requires all defaults be hard-coded values!), so be sure to update the
//       `extension.ts` file to set the version there as well.


// Define the curret version of the RDA Common Standard
export const RDA_COMMON_STANDARD_VERSION = "1.2";
/* eslint-disable @typescript-eslint/no-explicit-any */
let rdaSchemaJson: any;

try {
  /* eslint-disable @typescript-eslint/no-require-imports */
  rdaSchemaJson = require("../schemas/dmp.schema.json");
} catch {

  // Fallback for environments that need runtime resolution
  if (typeof window === 'undefined') {
    // Only try fs operations on server
    /* eslint-disable @typescript-eslint/no-require-imports */
    const fs = typeof window === 'undefined' ? require("fs") : null;
    /* eslint-disable @typescript-eslint/no-require-imports */
    const path = typeof window === 'undefined' ? require("path") : null;
    // Convert the downloaded JSON schema into types
    // First try resolving via the package export (works when installed from GitHub branch or npm)
    function resolveSchemaPath(): string | undefined {
      try {
        // require.resolve respects the "exports" map in package.json
        const resolved = require.resolve("@dmptool/types/schemas/dmp.schema.json");
        if (fs.existsSync(resolved)) {
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

    rdaSchemaJson = JSON.parse(fs.readFileSync(RDA_COMMON_STANDARD_JSON_FILE, "utf8"));
  } else {
    throw new Error("Schema must be bundled for browser use or the package must include schemas/ directory");
  }
}

// Ignoring ESLint here because it doesn't like that we're only using jsonSchema as a Type
// but that's exactly what we want to do.
export const RDACommonStandardDMPJSONSchema = rdaSchemaJson;;

// The version of the DMP that conforms to the RDA Common Standard (without our extensions)
export type RDACommonStandardDMPType = FromSchema<typeof rdaSchemaJson>;

// The DMP Tool extensions to the RDA Common Standard
export type DMPToolExtensionType = z.infer<typeof ExtensionSchema>;
export const DMPToolExtensionSchema = ExtensionSchema;
export const ExtensionJSONSchema = z.toJSONSchema(ExtensionSchema);

// Get the top level `dmp` object from the RDA Common Standard DMP and merge it with the DMP Tool extensions
type RDAInner = RDACommonStandardDMPType extends { dmp: infer T } ? T : any;
type MergedDMP = RDAInner & DMPToolExtensionType;

// Export the merged DMP as a type
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type DMPToolDMPType = {
  dmp: MergedDMP;
};
