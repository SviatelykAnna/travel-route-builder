import { useCallback, useEffect, useState } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, toggle };
};
