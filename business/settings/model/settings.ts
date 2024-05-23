import { z } from 'zod';

const settingsSchema = z.object({
  active: z.boolean(),
});

type Settings = z.infer<typeof settingsSchema>;

export { settingsSchema };
export type { Settings };
