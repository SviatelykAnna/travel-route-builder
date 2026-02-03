import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const normalizeString = (input: string) => {
  return input.toLowerCase().trim();
};

export const downloadJSON = (filename: string, jsonString: string): void => {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const importJSON = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';

    const timeoutMs = 5 * 60 * 1000;
    const timeoutId = setTimeout(() => {
      input.remove();
      reject(new Error('File selection was cancelled or timed out'));
    }, timeoutMs);

    const onChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      clearTimeout(timeoutId);
      input.removeEventListener('change', onChange);
      input.remove();

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') {
            reject(new Error('Could not read file'));
            return;
          }
          resolve(JSON.parse(text));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    };

    input.addEventListener('change', onChange);
    document.body.appendChild(input);
    input.click();
  });
};
