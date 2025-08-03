/**
 * Local Storage Utility
 * Type-safe localStorage operations with JSON serialization
 */

/**
 * Predefined localStorage keys for type safety and consistency
 */
export enum LocalStorageKeys {
  AUTH_TOKEN = "LocalStorageKeys.auth-token",
  BOOKING_DATA_TO_COMPLETE = "LocalStorageKeys.booking-data-to-complete", //temporary storage for booking data to complete for unauthenticated users
}

type SerializableValue = string | number | boolean | object | null;

interface StoredItemWithExpiry<T> {
  value: T;
  expiry: number;
}

/**
 * Check if localStorage is available
 */
const isAvailable = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

type StorageKey = LocalStorageKeys | string;

/**
 * Set an item in localStorage
 */
const setItem = <T extends SerializableValue>(
  key: StorageKey,
  value: T
): boolean => {
  if (!isAvailable()) return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Get an item from localStorage
 */
const getItem = <T extends SerializableValue>(key: StorageKey): T | null => {
  if (!isAvailable()) return null;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

/**
 * Get an item with default value
 */
const getWithDefault = <T extends SerializableValue>(
  key: StorageKey,
  defaultValue: T
): T => {
  const item = getItem<T>(key);
  return item ?? defaultValue;
};

/**
 * Remove an item from localStorage
 */
const removeItem = (key: StorageKey): boolean => {
  if (!isAvailable()) return false;

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if a key exists
 */
const hasItem = (key: StorageKey): boolean => {
  if (!isAvailable()) return false;
  return window.localStorage.getItem(key) !== null;
};

/**
 * Set item with expiration
 */
const setWithExpiry = <T extends SerializableValue>(
  key: StorageKey,
  value: T,
  expiryMs: number
): boolean => {
  const item: StoredItemWithExpiry<T> = {
    value,
    expiry: Date.now() + expiryMs,
  };
  return setItem(key, item);
};

/**
 * Get item with expiration check
 */
const getWithExpiry = <T extends SerializableValue>(
  key: StorageKey
): T | null => {
  const item = getItem<StoredItemWithExpiry<T>>(key);

  if (!item || !("expiry" in item)) return null;

  if (Date.now() > item.expiry) {
    removeItem(key);
    return null;
  }

  return item.value;
};

/**
 * Clear all localStorage
 */
const clear = (): boolean => {
  if (!isAvailable()) return false;

  try {
    window.localStorage.clear();
    return true;
  } catch {
    return false;
  }
};

const localStorage = {
  isAvailable,
  set: setItem,
  get: getItem,
  getWithDefault,
  remove: removeItem,
  has: hasItem,
  setWithExpiry,
  getWithExpiry,
  clear,
};

export default localStorage;
