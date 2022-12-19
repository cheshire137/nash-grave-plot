const getPageTitleForResults = (totalResults: number) => {
  if (totalResults === 1) return '1 result';
  if (totalResults > 1) return `${totalResults.toLocaleString('en-US')} results`;
  return 'No results';
}

export default getPageTitleForResults;
