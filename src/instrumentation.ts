import { settings } from '@/config/settings';

export const register = () => {
  // Instrumentation
  // Set experimental.instrumentationHook = true; in your next.config.js
  console.log(`Instrumentation, uploading file path ${settings.uploading.tempFolder}`);
}
