const BASE_URL = 'https://restcountries.com/v3.1/';

export const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};
