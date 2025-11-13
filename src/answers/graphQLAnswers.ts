import { z } from 'zod';
import { AnswerSchema } from './answer';

// Answers to GraphQL Question Types

export const AffiliationSearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('affiliationSearch'),
  answer: z.object({
    affiliationId: z.string().default(''),   // The unique id of the affiliation (e.g. ROR URI)
    affiliationName: z.string().default('')  // The name of the affiliation
  }).default({})
}));

export const LicenseSearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('licenseSearch'),
  answer: z.array(z.object({
    licenseId: z.string().default(''),   // The unique id of the license
    licenseName: z.string().default('')  // The name of the license
  }).default({})).default([])
}));

export const MetadataStandardSearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('metadataStandardSearch'),
  answer: z.array(z.object({
    metadataStandardId: z.string().default(''),   // The unique id of the metadata standard
    metadataStandardName: z.string().default('')  // The name of the metadata standard
  }).default({})).default([])
}));

export const RepositorySearchAnswerSchema = AnswerSchema.merge(z.object({
  type: z.literal('repositorySearch'),
  answer: z.array(z.object({
    repositoryId: z.string().default(''),   // The unique id of the repository
    repositoryName: z.string().default('')  // The name of the repository
  }).default({})).default([])
}));

// This will ensure that object validations are against the Zod schemas defined above
export type AffiliationSearchAnswerType = z.infer<typeof AffiliationSearchAnswerSchema>;
export type LicenseSearchAnswerType = z.infer<typeof LicenseSearchAnswerSchema>;
export type MetadataStandardSearchAnswerType = z.infer<typeof MetadataStandardSearchAnswerSchema>;
export type RepositorySearchAnswerType = z.infer<typeof RepositorySearchAnswerSchema>;
