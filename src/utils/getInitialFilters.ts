import Filter from '../models/Filter';

const getInitialFilters = (searchParams: URLSearchParams) => {
  const filters: Filter[] = [];
  for (const [id, value] of searchParams.entries()) {
    filters.push({ id, value });
  }
  return filters;
};

export default getInitialFilters;
