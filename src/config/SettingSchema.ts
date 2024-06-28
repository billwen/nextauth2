import z from 'zod';

export const UploadingSchema = z.object({
  tempFolder: z.string()
});

export const SettingSchema = z.object({
  uploading: UploadingSchema,
});

export type Setting = z.infer<typeof SettingSchema>;
