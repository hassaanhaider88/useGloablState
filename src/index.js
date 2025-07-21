import { useState, useEffect } from "react";

const globalStore = new Map();

export function useGlobalState(key, initialValue, options = {}) {
  const { persist = false } = options;

  // Get value from localStorage if persist is true
  const getInitial = () => {
    if (persist) {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.warn(`[useGlobalState] Failed to parse stored value for key "${key}".`);
        }
      }
    }
    return initialValue;
  };

  if (!globalStore.has(key)) {
    globalStore.set(key, {
      value: getInitial(),
      listeners: new Set(),
    });
  }

  const [, forceRender] = useState(0);

  useEffect(() => {
    const store = globalStore.get(key);
    const update = () => forceRender(n => n + 1);
    store.listeners.add(update);

    return () => {
      store.listeners.delete(update);
    };
  }, [key]);

  const store = globalStore.get(key);

  const setValue = (val) => {
    const newValue = typeof val === "function" ? val(store.value) : val;
    store.value = newValue;

    if (persist) {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error(`[useGlobalState] Failed to save key "${key}" to localStorage`, e);
      }
    }

    store.listeners.forEach(listener => listener());
  };

  return [store.value, setValue];
}


