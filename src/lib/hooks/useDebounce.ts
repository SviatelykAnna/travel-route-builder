import { useEffect, useState } from 'react';

const DEFAULT_DEBOUNCE_MS = 300;

export function useDebounce<T>(value: T, delay = DEFAULT_DEBOUNCE_MS): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
