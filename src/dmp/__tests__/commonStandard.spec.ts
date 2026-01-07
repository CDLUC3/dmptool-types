import fs from 'fs';
import { Validator } from 'jsonschema';
import { RDACommonStandardDMPType } from "../index";

const SCHEMA_PATH = './schemas/dmp.schema.json';

describe('validate the RDA common standard', () => {
  it('validates a minimal DMP', async () => {
    const validator = new Validator();
    const schema = await fs.readFileSync(SCHEMA_PATH, 'utf8');

    const dmp: RDACommonStandardDMPType = {
      dmp: {
        title: 'Test DMP',
        dmp_id: {
          identifier: '123456789',
          type: 'other'
        },
        created: '2021-01-01 03:11:23Z',
        modified: '2021-01-01 02:23:11Z',
        ethical_issues_exist: 'unknown',
        language: 'eng',
        contact: {
          name: 'Test Contact',
          mbox: 'tester@example.com',
          contact_id: [{
            identifier: '123456789',
            type: 'other'
          }]
        },
        dataset: [{
          title: 'Test Dataset',
          dataset_id: {
            identifier: '123',
            type: 'other'
          },
          personal_data: 'unknown',
          sensitive_data: 'no',
        }]
      }
    };

    const result = validator.validate(dmp, JSON.parse(schema));
    // If there were errors, print them out so we can see why
    if (result.errors.length > 0) console.log(result.errors);
    expect(result.errors.length).toBe(0);
  });

  it('validates a full DMP', async() => {
    const validator = new Validator();
    const schema = await fs.readFileSync(SCHEMA_PATH, 'utf8');

    const dmp: RDACommonStandardDMPType = {
      dmp: {
        title: 'Test DMP',
        description: 'This is a test DMP',
        dmp_id: {
          identifier: '123456789',
          type: 'other'
        },
        created: '2021-01-01 03:11:23Z',
        modified: '2021-01-01 02:23:11Z',
        ethical_issues_exist: 'yes',
        ethical_issues_description: 'This DMP contains ethical issues',
        ethical_issues_report: 'https://example.com/ethical-issues-report',
        language: 'eng',
        contact: {
          name: 'Test Contact',
          mbox: 'tester@example.com',
          contact_id: [{
            identifier: 'https://orcid.org/0000-0000-0000-0000',
            type: 'orcid'
          }],
          affiliation: [{
            name: 'Test University',
            affiliation_id: {
              identifier: 'https://ror.org/01234567890',
              type: 'ror'
            }
          }],
        },
        contributor: [{
          name: 'Test Contact',
          contributor_id: [{
            identifier: 'https://orcid.org/0000-0000-0000-0000',
            type: 'orcid'
          }],
          affiliation: [{
            name: 'Test University',
            affiliation_id: {
              identifier: 'https://ror.org/01234567890',
              type: 'ror'
            }
          }],
          role: ['https://example.com/roles/investigation', 'https://example.com/roles/other']
        }],
        cost: [{
          title: 'Budget Cost',
          description: 'Description of budget costs',
          value: 1234.56,
          currency_code: 'USD'
        }],
        dataset: [{
          title: 'Test Dataset',
          type: 'dataset',
          description: 'This is a test dataset',
          dataset_id: {
            identifier: '123',
            type: 'other'
          },
          personal_data: 'unknown',
          sensitive_data: 'no',
          data_quality_assurance: ['Statement about data quality assurance'],
          is_reused: false,
          issued: '2026-01-03',
          keyword: ['test', 'dataset'],
          language: 'eng',
          metadata: [{
            description: 'Description of metadata',
            language: 'eng',
            metadata_standard_id: [{
              identifier: 'https://example.com/metadata-standards/123',
              type: 'url'
            }]
          }],
          preservation_statement: 'Statement about preservation',
          security_and_privacy: [{
            title: 'Security and Privacy Statement',
            description: 'Description of security and privacy statement'
          }],
          alternate_identifier: [{
            identifier: 'https://example.com/dataset/123',
            type: 'url'
          }],
          technical_resource: [{
            name: 'Test Server',
            description: 'This is a test server',
            technical_resource_id: [{
              identifier: 'https://example.com/server/123',
              type: 'url'
            }],
          }],
          distribution: [{
            title: 'Test Distribution',
            description: 'This is a test distribution',
            access_url: 'https://example.com/dataset/123/distribution/123456789',
            download_url: 'https://example.com/dataset/123/distribution/123456789/download',
            byte_size: 123456789,
            format: ['application/zip'],
            data_access: 'open',
            issued: '2026-01-03',
            license: [{
              license_ref: 'https://spdx.org/licenses/CC-BY-4.0.html',
              start_date: '2026-01-03'
            }],
            host: {
              title: 'Test Host',
              description: 'This is a test host',
              url: 'https://example.com/host/123',
              host_id: [{
                identifier: 'https://re3data.org/2784y97245792756789',
                type: 'url'
              }],
              availability: '99.99',
              backup_frequency: 'weekly',
              backup_type: 'tapes',
              certified_with: 'coretrustseal',
              geo_location: 'US',
              pid_system: ['doi', 'ark'],
              storage_type: 'LTO-8 tape',
              support_versioning: 'yes'
            }
          }]
        }],
        related_identifier: [{
          identifier: 'https://doi.org/10.1234/dmp.123456789',
          relation_type: 'cites',
          resource_type: 'dataset',
          type: 'doi'
        }],
        alternate_identifier: [{
          identifier: 'https://example.com/dmp/123456789',
          type: 'url'
        }],
      },
      project: [{
        title: 'Test Project',
        description: 'This is a test project',
        project_id: [{
          identifier: '123456789',
          type: 'other'
        }],
        start: '2025-01-01',
        end: '2028-01-31',
        funding: [{
          name: 'Funder Organization',
          funding_status: 'granted',
          funder_id: {
            identifier: 'https://ror.org/0987654321',
            type: 'ror'
          },
          grant_id: [{
            identifier: '123456789',
            type: 'other'
          }]
        }]
      }]
    };

    const result = validator.validate(dmp, JSON.parse(schema));
    // If there were errors, print them out so we can see why
    if (result.errors.length > 0) console.log(result.errors);
    expect(result.errors.length).toBe(0);
  });
});
