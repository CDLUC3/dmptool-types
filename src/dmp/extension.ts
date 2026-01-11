// DMP Tool extensions to the RDA Common Standard
//    See: https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard
//
import { z } from 'zod'
import {
  AnyAnswerSchema,
  DefaultTextAreaAnswer
} from "../answers";

// the DMP visibility setting (should be used to check authorization)
const visibilityTypes = [
  'public',
  'private',
  'embargoed',
];

// The types of research facilities
const researchFacilityTypes = [
  'data_center',
  'field_station',
  'laboratory',
  'observatory',
  'other',
];

// The possible statuses of a DMP
const statusTypes = [
  'archived',
  'draft',
  'complete',
];

const ResearchDomainSchema = z.object({
  // The human-readable name for the research domain
  name: z.string(),
  // The identifier for the research domain
  research_domain_identifier: z.object({
    identifier: z.string().optional(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  }).optional(),
});

const ResearchFacilitySchema = z.object({
  // The human-readable name of the research facility
  name: z.string(),
  // The facility type
  type: z.enum(researchFacilityTypes).default('other'),
  // The identifier for the research facility
  research_facility_identifier: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  }),
});

const FundingOpportunitySchema = z.object({
  // The id of the project this opportunity maps to
  project_id: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('other')
  }),
  // The id of the funding this opportunity maps to within the project
  funder_id: z.object({
    identifier: z.string(),
    type: z.enum(['ror', 'url', 'other']).default('ror')
  }),
  // The opportunity id
  opportunity_identifier: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  })
});

const FundingProjectNumberSchema = z.object({
  // The id of the project this opportunity maps to
  project_id: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('other')
  }),
  // The id of the funding this opportunity maps to within the project
  funder_id: z.object({
    identifier: z.string(),
    type: z.enum(['ror', 'url', 'other']).default('ror')
  }),
  // The funder's identifier for this project
  project_identifier: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  })
});

const VersionSchema = z.object({
  // URL to fetch the historical version of the DMP
  access_url: z.string(),
  // The date of the version
  version: z.iso.datetime(),
});

const NarrativeAnswerSchema = z.object({
  id: z.number(),
  json: AnyAnswerSchema,
});
const DefaultAnswer = NarrativeAnswerSchema.parse({
  id: 0,
  json: DefaultTextAreaAnswer
});

const NarrativeQuestionSchema = z.object({
  id: z.number(),
  order: z.number(),
  text: z.string(),
  answer: NarrativeAnswerSchema.optional(),
});
const DefaultQuestion = NarrativeQuestionSchema.parse({
  id: 0,
  order: 0,
  text: 'Undefined question text',
  answer: DefaultAnswer
});

const NarrativeSectionSchema = z.object({
  id: z.number(),
  order: z.number(),
  title: z.string(),
  description: z.string().optional(),
  question: z.array(NarrativeQuestionSchema)
});
const DefaultSection = NarrativeSectionSchema.parse({
  id: 0,
  order: 0,
  title: 'Undefined section',
  question: [DefaultQuestion]
});

const NarrativeTemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  version: z.string().optional(),
  section: z.array(NarrativeSectionSchema)
});
const DefaultNarrativeTemplate = NarrativeTemplateSchema.parse({
  id: 0,
  title: 'Undefined template',
  section: [DefaultSection]
});

const NarrativeSchema = z.object({
  download_url: z.string().optional(),
  template: NarrativeTemplateSchema.optional(),
});
export const DefaultNarrative = NarrativeSchema.parse({
  template: DefaultNarrativeTemplate
})

export const ExtensionSchema = z.object({
  // TODO: Would eventually be nice to set this to the RDA_COMMON_STANDARD_VERSION
  //       when Zod's toJSONSchema allows it
  rda_schema_version: z.string().default("1.2"),
  // The name of the system that owns this record
  provenance: z.string(),
  // The current status of the DMP
  status: z.enum(statusTypes).default('draft'),
  // The visibility setting for the DMP
  privacy: z.enum(visibilityTypes).default('private'),
  // Whether the DMP is featured on the public plans page of the DMP Tool website
  featured: z.enum(['yes', 'no']).default('no'),
  // The date the DMP Id was registered as a DOI with EZID/DataCite
  registered: z.iso.datetime().optional(),
  // The date the DMP's DOI was tomb-stoned
  tombstoned: z.iso.datetime().optional(),
  // The narrative content of the DMP expressed as a JSON object
  narrative: NarrativeSchema.optional(),
  // The research domain of the project/DMP
  research_domain: ResearchDomainSchema.optional(),
  // Research facilities used to collect or process data
  research_facility: z.array(ResearchFacilitySchema).optional(),
  // Historical versions of the DMP
  version: z.array(VersionSchema).optional(),
  // Funding opportunity / call for grant submissions related to the funding
  funding_opportunity: z.array(FundingOpportunitySchema).optional(),
  // Funding project number (defined by the funder)
  funding_project: z.array(FundingProjectNumberSchema).optional(),
});
export const DefaultExtensionSchema = ExtensionSchema.parse({
  provenance: 'your-application',
});
