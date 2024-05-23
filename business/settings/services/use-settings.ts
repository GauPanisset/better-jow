import { useEffect, useState } from 'react';

import { defaultSettings, settingsStorageKey } from '../constants';
import { Settings } from '../model/settings';

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  /**
   * Initialize the settings state from storage.
   */
  useEffect(() => {
    const initiateSettings = async () => {
      const localSettings = await storage.getItem<Settings>(settingsStorageKey);
      if (!localSettings) {
        storage.setItem(settingsStorageKey, defaultSettings);
      } else {
        setSettings(localSettings);
      }
    };

    initiateSettings();
  }, []);

  /**
   * Watch storage changes to update the state.
   */
  useEffect(() => {
    const unwatch = storage.watch<Settings>(
      settingsStorageKey,
      (newSettings) => {
        setSettings(newSettings ? newSettings : defaultSettings);
      }
    );

    return () => {
      unwatch();
    };
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    storage.setItem(settingsStorageKey, newSettings);
  };

  return { settings, updateSettings };
};

export { useSettings };
