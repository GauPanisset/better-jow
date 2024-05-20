import { localStorageStoreSchema } from '../model/local-storage-store';

class JowStoreManager {
  private static localStorageKey = 'jow_store';

  constructor() {}

  setItem(key: string, value: unknown) {
    const currentStore = window.localStorage.getItem(
      JowStoreManager.localStorageKey
    );

    if (!currentStore) {
      throw new Error(
        `Cannot find jow store in local storage. Missing entry with key ${JowStoreManager.localStorageKey}`
      );
    }

    const parsedStore = JSON.parse(currentStore);

    const keyParts = key.split('.');

    let currentStorePart = parsedStore;
    for (const keyPart of keyParts.slice(0, -1)) {
      currentStorePart = currentStorePart[keyPart];
    }
    currentStorePart[keyParts[keyParts.length - 1]] = value;

    window.localStorage.setItem(
      JowStoreManager.localStorageKey,
      JSON.stringify(parsedStore)
    );
  }

  /**
   * Return a `unknown` type but zod actually check that the type is correct.
   * So we can safely cast it afterward.
   */
  getItem<TReturn>(key: string): TReturn {
    const currentStore = window.localStorage.getItem(
      JowStoreManager.localStorageKey
    );

    if (!currentStore) {
      throw new Error(
        `Cannot find jow store in local storage. Missing entry with key ${JowStoreManager.localStorageKey}`
      );
    }

    const parsedStore = localStorageStoreSchema.parse(JSON.parse(currentStore));

    const keyParts = key.split('.');

    let value: unknown = parsedStore;

    for (const keyPart of keyParts) {
      if (value && typeof value === 'object') {
        value = value[keyPart as keyof typeof value];
      } else {
        throw new Error('It should never happen');
      }
    }

    return value as TReturn;
  }
}

export { JowStoreManager };
