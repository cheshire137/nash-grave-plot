const prettyDateStr = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let monthStr = month.toString();
  if (month < 10) monthStr = `0${month}`;

  let dayStr = day.toString();
  if (day < 10) dayStr = `0${day}`;

  return `${year}-${monthStr}-${dayStr}`;
};

export default prettyDateStr;
