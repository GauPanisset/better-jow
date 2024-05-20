import { z } from 'zod';

/**
 * This schema contains only useful keys for the extension.
 */
const localStorageStoreSchema = z.object({
  auth: z.object({
    accessToken: z.string(),
  }),
});

export { localStorageStoreSchema };
