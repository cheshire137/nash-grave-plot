const parseMonthYearString = (str: string) => {
  const matches = str.match(/^(?<month>\d\d?)\/(?<year>\d\d\d\d?)$/);

  if (matches && matches.groups) {
    let year = parseInt(matches.groups.year, 10);
    if (year < 1000) year += 1000; // handle strings like '02/962'

    const month = parseInt(matches.groups.month, 10);

    let monthStr = month.toString();
    if (month < 10) monthStr = `0${month}`;

    return `${year}-${monthStr}`;
  }

  return null;
};

export default parseMonthYearString;
