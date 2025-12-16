import { z } from 'zod';
import { AnswerSchema } from './answer';
import { DefaultMeta } from "../questions";

// Answers to GraphQL Question Types

export const AffiliationSearchAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('affiliationSearch'),
  answer: z.object({
    affiliationId: z.string().default(''),   // The unique id of the affiliation (e.g. ROR URI)
    affiliationName: z.string().default('')  // The name of the affiliation
  })
});
export const DefaultAffiliationSearchAnswer = AffiliationSearchAnswerSchema.parse({
  type: 'affiliationSearch',
  answer: {
    affiliationId: '',
    affiliationName: ''
  },
  meta: DefaultMeta
});

export const LicenseSearchAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('licenseSearch'),
  answer: z.array(z.object({
    licenseId: z.string().default(''),   // The unique id of the license
    licenseName: z.string().default('')  // The name of the license
  })).default([])
});
export const DefaultLicenseSearchAnswer = LicenseSearchAnswerSchema.parse({
  type: 'licenseSearch',
  answer: [{
    licenseId: '',
    licenseName: ''
  }],
  meta: DefaultMeta
});

export const MetadataStandardSearchAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('metadataStandardSearch'),
  answer: z.array(z.object({
    metadataStandardId: z.string().default(''),   // The unique id of the metadata standard
    metadataStandardName: z.string().default('')  // The name of the metadata standard
  })).default([])
});
export const DefaultMetadataStandardSearchAnswer = MetadataStandardSearchAnswerSchema.parse({
  type: 'metadataStandardSearch',
  answer: [{
    metadataStandardId: '',
    metadataStandardName: ''
  }],
  meta: DefaultMeta
});

export const RepositorySearchAnswerSchema = z.object({
  ...AnswerSchema.shape,
  type: z.literal('repositorySearch'),
  answer: z.array(z.object({
    repositoryId: z.string().default(''),   // The unique id of the repository
    repositoryName: z.string().default('')  // The name of the repository
  })).default([])
});
export const DefaultRepositorySearchAnswer = RepositorySearchAnswerSchema.parse({
  type: 'repositorySearch',
  answer: [{
    repositoryId: '',
    repositoryName: ''
  }],
  meta: DefaultMeta
});

// This will ensure that object validations are against the Zod schemas defined above
export type AffiliationSearchAnswerType = z.infer<typeof AffiliationSearchAnswerSchema>;
export type LicenseSearchAnswerType = z.infer<typeof LicenseSearchAnswerSchema>;
export type MetadataStandardSearchAnswerType = z.infer<typeof MetadataStandardSearchAnswerSchema>;
export type RepositorySearchAnswerType = z.infer<typeof RepositorySearchAnswerSchema>;

export const AffiliationSearchAnswerJSONSchema = z.toJSONSchema(AffiliationSearchAnswerSchema);
export const LicenseSearchAnswerJSONSchema = z.toJSONSchema(LicenseSearchAnswerSchema);
export const MetadataStandardSearchAnswerJSONSchema = z.toJSONSchema(MetadataStandardSearchAnswerSchema);
export const RepositorySearchAnswerJSONSchema = z.toJSONSchema(RepositorySearchAnswerSchema);
