import { useMemo, useState } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useGetAllCountries } from '@/services/rest-countries/queries';

import { CountryItem } from './CountryItem';

export const Sidebar = () => {
  const { data, isLoading, isError } = useGetAllCountries();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery.toLowerCase());

  const filteredCountries = useMemo(
    () => data?.filter(({ name }) => name.common.toLowerCase().includes(debouncedSearchQuery)),
    [data, debouncedSearchQuery],
  );

  return (
    <div className="bg-light-grey border-neutral-grey h-full max-h-dvh w-90 overflow-y-scroll border-r py-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-2">
          <h1 className="text-dark-grey text-lg font-medium">Countries List</h1>
          <Input
            disabled={isLoading || isError}
            type="text"
            placeholder="Enter country name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isError && (
          <ErrorMessage
            className="px-3"
            message="Something went wrong while loading countries list"
          />
        )}

        {isLoading ? (
          <Spinner className="size-6 self-center text-amber-400" />
        ) : (
          <ul>
            {filteredCountries?.map((country) => (
              <CountryItem key={country.cca2} {...country} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
