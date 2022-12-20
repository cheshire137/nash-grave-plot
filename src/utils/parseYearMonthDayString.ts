const parseYearMonthDayString = (str: string) => {
  // Don't include `$` for end of string so that we match strings like '1999-12-04T00:00:00.000' that always
  // have the same time and just represent the date:
  const matches = str.match(/^(?<year>\d\d\d\d)-(?<month>\d\d?)-(?<day>\d\d?)/);

  if (matches && matches.groups) {
    let year = parseInt(matches.groups.year, 10);
    if (year < 1000) year += 1000; // handle strings like '962/02/03'
    const month = parseInt(matches.groups.month, 10);
    const day = parseInt(matches.groups.day, 10);
    return new Date(year, month - 1, day);
  }

  return null;
};

export default parseYearMonthDayString;
