import { z } from 'zod';
import { buildInfo } from '../generated/buildInfo';

const metadataSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  commit: z.string().min(3),
  fullCommit: z.string().min(3),
  builtAt: z.iso.datetime(),
  repositoryUrl: z.url(),
  paypalUrl: z.url(),
  liveUrl: z.url()
});

export const appMetadata = metadataSchema.parse(buildInfo);
