// Script to fetch the RDA Common Standard JSON schema
import fs from "fs";

const RDA_COMMON_STANDARD_BASE_URL='https://raw.githubusercontent.com/RDA-DMP-Common/RDA-DMP-Common-Standard';
const RDA_COMMON_STANDARD_SCHEMA_PATH='/refs/heads/master/examples/JSON/JSON-schema/';
const RDA_COMMON_STANDARD_FILE_NAME_PREFIX='maDMP-schema-';

const JSON_SCHEMA_OUTPUT_FILE= './schemas/dmp.schema.json';

const RDA_COMMON_STANDARD_VERSION='1.2';

async function fetchRDACommonStandard(version= RDA_COMMON_STANDARD_VERSION): Promise<string> {
  const url = `${RDA_COMMON_STANDARD_BASE_URL}${RDA_COMMON_STANDARD_SCHEMA_PATH}${version}/`;
  const file = `${RDA_COMMON_STANDARD_FILE_NAME_PREFIX}${version}.json`;
  const response = await fetch(`${url}${file}`);

  if (response.ok) {
    const buffer = Buffer.from(await response.arrayBuffer());
    const jsonSchema = JSON.parse(buffer.toString('utf8'));
    fs.writeFileSync(JSON_SCHEMA_OUTPUT_FILE, JSON.stringify(jsonSchema, null, 2));
    return 'Download complete. JSON schema converted to Zod schema in src/dmp/commonStandard.ts.'
  } else {
    console.log(`Failed to fetch ${url}${file} - ${response.status} ${response.statusText}`);
    return response.statusText;
  }
}

// https://raw.githubusercontent.com/RDA-DMP-Common/RDA-DMP-Common-Standard/refs/heads/master/examples/JSON/JSON-schema/1.2/maDMP-schema-1.2.json

fetchRDACommonStandard();
