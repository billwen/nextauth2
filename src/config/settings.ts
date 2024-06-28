import path from 'node:path'
import fs from 'node:fs'
import yaml from 'js-yaml';
import { Setting, SettingSchema } from '@/config/SettingSchema'

let _settings: Setting | undefined = undefined;

const validateSetting = (setting: Setting) => {
  const { uploading } = setting;

  // Validate uploading
  const tempFolderFullPath = path.resolve(process.cwd(), uploading.tempFolder);
  if (!fs.existsSync(tempFolderFullPath)) {
    fs.mkdirSync(tempFolderFullPath, { recursive: true });
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
    _settings = SettingSchema.parse(config);

    validateSetting(_settings);
  } catch (err) {
    console.error(`Loading settings from ${fullPath} failed: ${err}`);
    throw err;
  }

  return _settings;

};

export const settings = loadSettings();
