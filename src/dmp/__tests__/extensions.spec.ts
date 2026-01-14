import { expect } from "@jest/globals";
import { DefaultExtensionSchema, ExtensionSchema } from "../extension";
import { DMPToolExtensionType } from "../index";

describe('extensions', () => {
  it('validates a minimal DMP Tool extension', () => {
    const expected: DMPToolExtensionType = {
      rda_schema_version: "1.2",
      provenance: 'your-application',
      status: 'draft',
      privacy: 'private',
      featured: 'no',
    };
    expect(DefaultExtensionSchema).toEqual(expected);
  });

  it('validates a full DMP Tool extension', () => {
    const validData: DMPToolExtensionType = {
      rda_schema_version: "1.2",
      provenance: 'your-application',
      status: 'complete',
      privacy: 'private',
      featured: 'no',
      registered: '2026-01-01T10:32:45Z',
      research_domain: {
        name: 'biology',
        research_domain_identifier: {
          identifier: 'https://example.com/01234567',
          type: 'url'
        }
      },
      research_facility: [{
        name: 'Super telescope',
        type: 'observatory',
        research_facility_identifier: {
          identifier: 'https://example.com/01234567',
          type: 'url'
        }
      }],
      funding_opportunity: [{
        project_id: {
          identifier: '123456789',
          type: 'other'
        },
        funder_id: {
          identifier: 'https://ror.org/0987654321',
          type: 'ror'
        },
        opportunity_identifier: {
          identifier: 'https://example.com/01234567',
          type: 'url'
        }
      }],
      funding_project: [{
        project_id: {
          identifier: '123456789',
          type: 'other'
        },
        funder_id: {
          identifier: 'https://ror.org/0987654321',
          type: 'ror'
        },
        project_identifier: {
          identifier: 'https://example.com/erbgierg',
          type: 'url'
        }
      }],
      version: [{
        access_url: 'https://example.com/dmps/123456789?version=2026-01-01T10:32:45Z',
        version: '2026-01-01T10:32:45Z',
      }],
      narrative: {
        download_url: 'https://example.com/dmps/123456789/narrative',
        template: {
          id: 1234567,
          title: 'Narrative Template',
          description: 'This is a test template for a DMP narrative',
          version: 'v1',
          section: [{
            id: 9876,
            title: 'Section one',
            description: 'The first section of the narrative',
            order: 1,
            question: [{
              id: 1234,
              text: 'What is the purpose of this DMP?',
              order: 1,
              answer: {
                id: 543,
                json: {
                  type: 'repositorySearch',
                  answer: [{
                    repositoryId: 'https://example.com/repository/123456789',
                    repositoryName: 'Example Repository',
                  }],
                  meta: {schemaVersion: '1.0'}
                }
              },
            }]
          }]
        }
      }
    };
    expect(() => ExtensionSchema.parse(validData)).not.toThrow();
  });
});
