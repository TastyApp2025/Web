import { useMemo } from 'react';

export function useSearch<T>(items: T[], searchTerm: string, searchFields: (keyof T)[]): T[] {
  return useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerSearchTerm);
        }
        return false;
      });
    });
  }, [items, searchTerm, JSON.stringify(searchFields)]);
}

export function useFilter<T>(
  items: T[],
  filterKey: keyof T,
  filterValue: string | null
): T[] {
  return useMemo(() => {
    if (!filterValue) {
      return items;
    }

    return items.filter((item) => {
      const value = item[filterKey];
      return value === filterValue;
    });
  }, [items, filterKey, filterValue]);
}

export function useSearchAndFilter<T>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
  filterKey?: keyof T,
  filterValue?: string | null
): T[] {
  const searchResults = useSearch(items, searchTerm, searchFields);
  
  return useMemo(() => {
    if (!filterKey || !filterValue) {
      return searchResults;
    }

    return searchResults.filter((item) => {
      return item[filterKey] === filterValue;
    });
  }, [searchResults, filterKey, filterValue]);
}
