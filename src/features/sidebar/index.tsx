import { useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useGetAllCountries } from '@/services/rest-countries/queries';

export const CountriesSidebar = () => {
  const { data, isLoading } = useGetAllCountries();

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
            disabled={isLoading}
            type="text"
            placeholder="Enter country name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <Spinner className="size-6 self-center text-amber-400" />
        ) : (
          <ul>
            {filteredCountries?.map((country) => (
              <div
                draggable="true"
                className="flex cursor-grab items-center gap-2 p-3 transition-colors hover:bg-amber-400/10"
                key={country.cca2}
              >
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="h-auto w-5 shrink-0"
                />
                <p className="text-sm">{country.name.common}</p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
