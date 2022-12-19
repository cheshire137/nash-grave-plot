const parseYearMonthDayString = (str: string) => {
  const regex = /^(\d\d\d\d)-(\d\d?)-(\d\d?)/;
  const match = str.match(regex);

  if (match) {
    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    return new Date(year, month - 1, day);
  }

  return null;
};

export default parseYearMonthDayString;
