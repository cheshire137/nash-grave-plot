const DateCellFormatter = ({value}) => {
  if (value instanceof Date) {
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = value.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  return value;
};

export default DateCellFormatter;
