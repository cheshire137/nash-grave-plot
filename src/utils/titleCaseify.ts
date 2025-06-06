const titleCaseify = (str: string) =>
  str
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ')

export default titleCaseify
