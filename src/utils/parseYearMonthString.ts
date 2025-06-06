const parseYearMonthString = (str: string) => {
  // e.g., '1852/3'
  const matches = str.match(/^(?<year>\d\d\d\d)\/(?<month>\d\d?)$/)

  if (matches && matches.groups) {
    const year = parseInt(matches.groups.year, 10)
    const month = parseInt(matches.groups.month, 10)

    let monthStr = month.toString()
    if (month < 10) monthStr = `0${month}`

    return `${year}-${monthStr}`
  }

  return null
}

export default parseYearMonthString
