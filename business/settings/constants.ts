import { Settings } from './model/settings';

const settingsStorageKey = 'local:better-jow-settings';

const defaultSettings: Settings = {
  active: true,
} as const;

export { defaultSettings, settingsStorageKey };
