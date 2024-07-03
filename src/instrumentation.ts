import { settings } from '@/config/settings';

export const runtime = 'nodejs';

export const register = () => {
  // Instrumentation
  // Set experimental.instrumentationHook = true; in your next.config.js
  console.log(`Instrumentation, uploading file path ${settings.parsedSetting.absTempFolder}`);
}
