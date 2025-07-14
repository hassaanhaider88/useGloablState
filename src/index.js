import { useState, useEffect } from "react";

const globalStore = new Map();

export function useGlobalState(key, initialValue) {
  if (
    globalStore.has(key) &&
    initialValue !== undefined &&
    globalStore.get(key).value !== initialValue
  ) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[useGlobalState] Key "${key}" already exists. The initialValue (${initialValue}) will be ignored.`
      );
    }
  }

  if (!globalStore.has(key)) {
    globalStore.set(key, {
      value: initialValue,
      listeners: new Set(),
    });
  }

  const [, forceRender] = useState(0);

  useEffect(() => {
    const store = globalStore.get(key);
    const update = () => forceRender((n) => n + 1);
    store.listeners.add(update);

    return () => {
      store.listeners.delete(update);
    };
  }, [key]);

  const store = globalStore.get(key);

  const setValue = (val) => {
    store.value = typeof val === "function" ? val(store.value) : val;
    store.listeners.forEach((listener) => listener());
  };

  return [store.value, setValue];
}
