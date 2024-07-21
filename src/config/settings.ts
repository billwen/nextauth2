import path from 'node:path'
import yaml from 'js-yaml';
import { LoadedSetting, Setting, SettingSchema } from '@/config/SettingSchema'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'

let _settings: Setting | undefined = undefined;

const validateSetting = (loadedSetting: LoadedSetting): Setting => {
  const { uploading } = loadedSetting;

  // Validate uploading
  const absTempFolder = path.resolve(process.cwd(), uploading.tempFolder);
  if (!existsSync(absTempFolder)) {
    mkdirSync(absTempFolder, { recursive: true });
  }

  // Validate uploading catalog
  const absUploadingCatalogFolder: Record<string, string> = {};
  for (const catalog of uploading.allowedCatalog) {
    const absCatalog = path.resolve(absTempFolder, catalog);
    if (!existsSync(absCatalog)) {
      mkdirSync(absCatalog, { recursive: true });
    }

    absUploadingCatalogFolder[catalog] = absCatalog;
  }

  return {
    ...loadedSetting,
    parsedSetting: {
      absTempFolder,
      absUploadingCatalogFolder,
    }
  }
}

const loadSettings = () => {
  if (_settings) {
    return _settings;
  }

  // Load settings
  const fileName = process.env.REACT_APP_SETTING_FILENAME;
  if (!fileName) {
    throw Error("No configuration file name provided, pls setup REACT_APP_SETTING_FILENAME environment variable");
  }

  const fullFileName = `settings-${fileName}.yaml`;

  const fullPath = path.resolve(process.cwd(), fullFileName);
  console.log(` Loading settings from ${fullPath}`);

  try {
    const config = yaml.load(readFileSync(fullPath, 'utf-8'));
    const loadedSetting = SettingSchema.parse(config);

    _settings = validateSetting(loadedSetting);
  } catch (err) {
    console.error(`Loading settings from ${fullPath} failed: ${err}`);
    throw err;
  }

  return _settings;

};

export const settings = loadSettings();
