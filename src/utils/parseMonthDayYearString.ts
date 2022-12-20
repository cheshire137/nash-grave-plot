const parseMonthDayYearString = (rawStr: string) => {
  // e.g., '.1/1/1918'
  const str = rawStr.replace(/^\.+/, '');

  // e.g., '12/28//1983', '9/17/1851'
  let matches = str.match(/^(?<month>\d\d?)\/+(?<day>\d\d?)\/+(?<year>\d\d\d\d?)$/);
  if (matches && matches.groups) {
    const month = parseInt(matches.groups.month, 10);
    const day = parseInt(matches.groups.day, 10);
    let year = parseInt(matches.groups.year, 10);
    if (year < 1000) year += 1000; // handle strings like '02/03/962'
    return new Date(year, month - 1, day);
  }

  // e.g., '9/21/190?', '?/22/1923', '10/22/19??'
  matches = str.match(/^(?<month>\d\d?)\/+(?<day>\d\d?)\/+(?<year>\d\d[\d?]\?)$/) ||
    str.match(/^(?<month>\?)\/+(?<day>\d\d?)\/+(?<year>\d\d\d\d?)$/);
  if (matches && matches.groups) {
    return `${matches.groups.year}-${matches.groups.month}-${matches.groups.day}`;
  }

  // e.g., '8/81982'
  matches = str.match(/^(?<month>\d\d?)\/+(?<dayyear>\d\d?\d{4})$/);
  if (matches && matches.groups) {
    const firstDayInt = parseInt(matches.groups.dayyear.charAt(0), 10);
    const remainingDayYearStr = matches.groups.dayyear.slice(1);
    if (remainingDayYearStr.length === 4) {
      const year = parseInt(remainingDayYearStr, 10);
      const month = parseInt(matches.groups.month, 10);
      return new Date(year, month - 1, firstDayInt);
    }
  }

  return null;
}

export default parseMonthDayYearString;
