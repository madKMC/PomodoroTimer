import { useState, useEffect } from 'react';

export function useLocalStorage<T extends object>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get stored value from localStorage or use initialValue
  const readValue = (): T => {
    try {
      const item = localStorage.getItem(key);
      // If item exists, merge it with initialValue to ensure all properties exist
      if (item) {
        const parsedItem = JSON.parse(item);
        return { ...initialValue, ...parsedItem };
      }
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Update localStorage when storedValue changes
  const setValue = (value: T) => {
    try {
      // Ensure we always merge with existing values
      const newValue = { ...initialValue, ...value };
      // Save to local state
      setStoredValue(newValue);
      // Save to localStorage
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Sync with localStorage in case it changes in another tab
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        // Merge with initialValue when syncing from other tabs
        const newValue = { ...initialValue, ...JSON.parse(e.newValue) };
        setStoredValue(newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}