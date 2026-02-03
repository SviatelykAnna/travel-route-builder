import { useMemo, useState } from 'react';

import AlertCard from '@/components/AlertCard';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { normalizeString } from '@/lib/utils';
import { useGetAllCountries } from '@/services/rest-countries/queries';

import { CountryItem } from './CountryItem';

const Sidebar = () => {
  const { data, isLoading, isError } = useGetAllCountries();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(normalizeString(searchQuery));

  const filteredCountries = useMemo(
    () => data?.filter(({ name }) => normalizeString(name.common).includes(debouncedSearchQuery)),
    [data, debouncedSearchQuery],
  );

  const content = useMemo(() => {
    if (isError) {
      return (
        <AlertCard
          className="align-center mx-4 px-3"
          message="Something went wrong while loading countries list"
        />
      );
    }

    if (isLoading) {
      return <Spinner className="size-6 self-center text-amber-400" />;
    }

    if (filteredCountries?.length === 0) {
      return (
        <AlertCard
          variant="info"
          className="align-center mx-4 px-3"
          title="No countries found"
          message="Try another search query"
        />
      );
    }

    return (
      <ul>
        {filteredCountries?.map((country) => (
          <CountryItem key={country.cca2} {...country} />
        ))}
      </ul>
    );
  }, [isError, isLoading, filteredCountries]);

  return (
    <div className="bg-primary-foreground border-muted flex max-h-dvh w-90 flex-col border-r">
      <div className="flex flex-col gap-2 px-4 py-4">
        <h1 className="text-muted-foreground text-lg font-medium">Countries List</h1>
        <Input
          disabled={isLoading || isError}
          type="text"
          placeholder="Enter country name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex max-h-full flex-1 flex-col gap-6 overflow-y-scroll">{content}</div>
    </div>
  );
};

export default Sidebar;
