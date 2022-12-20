import parseYearMonthDayString from './parseYearMonthDayString';
import parseMonthDayYearString from './parseMonthDayYearString';
import parseMonthYearString from './parseMonthYearString';
import parseYearMonthString from './parseYearMonthString';

// Sample values:
// - '1915'
// - 'BEFORE 1880'
// - '4/10/183(5)'
// - '4/29/1884 OR 4/29/1894
// - '02/03/962
// - '1852/3'
const parseDateString = (maybeStr?: string | null) => {
  if (typeof maybeStr !== 'string') return null;

  const str = maybeStr.trim();
  if (str.length < 1) return null;

  let dateOrNormalizedStr = parseMonthDayYearString(str);
  if (dateOrNormalizedStr) return dateOrNormalizedStr;

  dateOrNormalizedStr = parseYearMonthDayString(str);
  if (dateOrNormalizedStr) return dateOrNormalizedStr;

  dateOrNormalizedStr = parseMonthYearString(str);
  if (dateOrNormalizedStr) return dateOrNormalizedStr;

  dateOrNormalizedStr = parseYearMonthString(str);
  if (dateOrNormalizedStr) return dateOrNormalizedStr;

  return str;
};

export default parseDateString;
