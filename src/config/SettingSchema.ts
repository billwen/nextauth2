import z from 'zod'

export const UploadingSchema = z.object({
  tempFolder: z.string()
});

export const SettingSchema = z.object({
  uploading: UploadingSchema,
});

export type LoadedSetting = z.infer<typeof SettingSchema>;

export type ParsedSetting = {
  absTempFolder: string;
};

export type Setting = {
  parsedSetting: ParsedSetting;
} & LoadedSetting;
