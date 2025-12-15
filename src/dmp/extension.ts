// DMP Tool extensions to the RDA Common Standard
//    See: https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard
//
import { z } from 'zod'

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

// Relation types are derived from the DataCite schema
const relationTypes = [
  "is_cited_by",
  "cites",
  "is_supplement_to",
  "is_supplemented_by",
  "is_continued_by",
  "continues",
  "is_described_by",
  "describes",
  "has_metadata",
  "is_metadata_for",
  "has_version",
  "is_version_of",
  "is_new_version_of",
  "is_previous_version_of",
  "is_part_of",
  "has_part",
  "is_published_in",
  "is_referenced_by",
  "references",
  "is_documented_by",
  "documents",
  "is_compiled_by",
  "compiles",
  "is_variant_form_of",
  "is_original_form_of",
  "is_identical_to",
  "is_reviewed_by",
  "reviews",
  "is_derived_from",
  "is_source_of",
  "is_required_by",
  "requires",
  "obsoletes",
  "is_obsoleted_by",
  "is_collected_by",
  "collects",
  "is_translation_of",
  "has_translation"
];

// Work types are derived from the DataCite schema
const workTypes = [
  "audiovisual",
  "book",
  "book_chapter",
  "collection",
  "computational_notebook",
  "conference_paper",
  "conference_proceeding",
  "data_paper",
  "dataset",
  "dissertation",
  "event",
  "image",
  "instrument",
  "interactive_resource",
  "journal",
  "journal_article",
  "model",
  "output_management_plan",
  "peer_review",
  "physical_object",
  "preprint",
  "project",
  "report",
  "service",
  "software",
  "sound",
  "standard",
  "study_registration",
  "text",
  "workflow",
  "other"
];

const ResearchDomainSchema = z.object({
  // The human-readable name for the research domain
  name: z.string(),
  // The identifier for the research domain
  research_domain_identifier: z.object({
    identifier: z.string().optional(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  }),
});

const RelatedIdentifierSchema = z.object({
  // The description of how the DMP is related to the work (e.g. the DMP "cites" the work)
  descriptor: z.enum(relationTypes).default('cites'),
  // The identifier of the work
  identifier: z.string(),
  // The type of identifier
  type: z.enum(['ark', 'doi', 'handle', 'url']).default('url'),
  // The type of the work
  work_type: z.enum(workTypes).default('dataset'),
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
  project_id: z.string(),
  // The id of the funding this opportunity maps to within the project
  funder_id: z.string(),
  // The opportunity id
  opportunity_identifier: z.object({
    identifier: z.string(),
    type: z.enum(['ark', 'doi', 'handle', 'url', 'other']).default('url')
  })
});

const VersionSchema = z.object({
  // URL to fetch the historical version of the DMP
  access_url: z.string(),
  // The date of the version
  version_date: z.date('yyyy-MM-dd HH:mm:ss'),
});

const NarrativeTemplateSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
});
const DefaultNarrativeTemplate = NarrativeTemplateSchema.parse({
  title: 'Undefined Template'
});

// URLs to fetch the narrative as a document other than JSON
const NarrativeURLsSchema = z.object({
  csv: z.string().optional(),
  docx: z.string().optional(),
  html: z.string().optional(),
  pdf: z.string().optional(),
});

const NarrativeSchema = z.object({
  download_urls: NarrativeURLsSchema,
  template: NarrativeTemplateSchema.optional(),
});
const DefaultNarrative = NarrativeSchema.parse({
  template: DefaultNarrativeTemplate
})

export const ExtensionSchema = z.object({
  // The name of the system that owns this record
  provenance: z.string(),
  // The visibility setting for the DMP
  privacy: z.enum(visibilityTypes).default('private'),
  // Whether the DMP is featured on the public plans page of the DMP Tool website
  featured: z.boolean().default(false),
  // The date the DMP Id was registered as a DOI with EZID/DataCite
  registered: z.date('yyyy-MM-dd HH:mm:ss').optional(),
  // The narrative content of the DMP expressed as a JSON object
  narrative: NarrativeSchema.optional(),
  // The research domain of the project/DMP
  research_domain: ResearchDomainSchema.optional(),
  // Other works related to the DMP
  related_identifiers: z.array(RelatedIdentifierSchema).optional(),
  // Research facilities used to collect or process data
  research_facilities: z.array(ResearchFacilitySchema).optional(),
  // Historical versions of the DMP
  versions: z.array(VersionSchema).optional(),
  // Funding opportunity / call for grant submissions related to the funding
  funding_opportunities: z.array(FundingOpportunitySchema).optional(),
});
export const DefaultExtensionSchema = ExtensionSchema.parse({
  provenance: 'your-application',
  narrative: DefaultNarrative
});

export type ExtensionType = z.infer<typeof ExtensionSchema>;
