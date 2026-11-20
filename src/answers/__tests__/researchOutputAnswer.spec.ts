import { describe, it, expect } from "@jest/globals";
import * as fs from "fs";
import * as path from "path";
import { RepositorySearchAnswerSchema } from '../graphQLAnswers';
import { ResearchOutputTableAnswerJSONSchema } from '../tableAnswers';
import { CURRENT_SCHEMA_VERSION } from "../../questions";

describe('Research output answers', () => {
  it('keeps where in the repository the output is', () => {
    const parsed = RepositorySearchAnswerSchema.parse({
      type: 'repositorySearch',
      answer: [{
        repositoryId: 'https://example.org/repositories/drive',
        repositoryName: 'Example Drive',
        repositoryLocation: 'https://drive.example.org/folders/abc'
      }],
      meta: { schemaVersion: CURRENT_SCHEMA_VERSION }
    });
    expect(parsed.answer[0].repositoryLocation).toEqual('https://drive.example.org/folders/abc');
  });

  it('publishes the research output answer as a JSON Schema', () => {
    const schema = ResearchOutputTableAnswerJSONSchema as unknown as { properties: { type: { const: string } } };
    expect(schema.properties.type.const).toEqual('researchOutputTable');
    const file = path.join(__dirname, '../../../schemas/researchOutputTableAnswer.schema.json');
    expect(JSON.parse(fs.readFileSync(file, 'utf-8'))).toEqual(JSON.parse(JSON.stringify(ResearchOutputTableAnswerJSONSchema)));
  });
});
