const getPageTitleForResults = (totalResults: number, singular?: string, plural?: string) => {
  const singularUnit = singular || 'result'
  const pluralUnit = plural || 'results'
  if (totalResults === 1) return `1 ${singularUnit}`
  if (totalResults > 1) return `${totalResults.toLocaleString('en-US')} ${pluralUnit}`
  return `No ${pluralUnit}`
}

export default getPageTitleForResults
