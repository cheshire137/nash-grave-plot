import parseYearMonthDayString from "./parseYearMonthDayString";
import parseMonthDayYearString from "./parseMonthDayYearString";

const parseDateString = (str?: string | null) => {
  if (typeof str !== 'string' || str.trim().length < 1) {
    return null;
  }

  let date = parseMonthDayYearString(str.trim());
  if (date) {
    return date;
  }

  date = parseYearMonthDayString(str.trim());
  if (date) {
    return date;
  }

  return str;
};

export default parseDateString;
