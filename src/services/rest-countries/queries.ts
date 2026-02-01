import { useQuery } from '@tanstack/react-query';

import { request } from './client';
import type { Country } from './types';

export const useGetAllCountries = () =>
  useQuery<Country[]>({
    queryFn: () => request<Country[]>('all?fields=name,cca2,flags'),
    queryKey: ['allCountries'],
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
