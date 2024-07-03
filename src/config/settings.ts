import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml';
import { LoadedSetting, Setting, SettingSchema } from '@/config/SettingSchema'

let _settings: Setting | undefined = undefined;

const validateSetting = (loadedSetting: LoadedSetting): Setting => {
  const { uploading } = loadedSetting;

  // Validate uploading
  const absTempFolder = path.resolve(process.cwd(), uploading.tempFolder);
  if (!fs.existsSync(absTempFolder)) {
    fs.mkdirSync(absTempFolder, { recursive: true });
  }

  return {
    ...loadedSetting,
    parsedSetting: {
      absTempFolder,
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

  const fullPath = path.resolve(process.cwd(), fileName);
  console.log(` Loading settings from ${fullPath}`);

  try {
    const config = yaml.load(fs.readFileSync(fullPath, 'utf-8'));
    const loadedSetting = SettingSchema.parse(config);

    _settings = validateSetting(loadedSetting);
  } catch (err) {
    console.error(`Loading settings from ${fullPath} failed: ${err}`);
    throw err;
  }

  return _settings;

};

export const settings = loadSettings();
