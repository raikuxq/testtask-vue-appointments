import moment from "moment";
/**
 * Convert date to string format
 * @param date { Date | Number } - Date instance or timestamp
 * @returns {string} - DD MMMM YYYY [at] h:mm A
 */
export function timeTextFormat(date) {
  let dateToFormat = date;

  if (typeof date === "number") {
    dateToFormat = new Date(date);
  }

  if (!(dateToFormat instanceof Date)) {
    return "";
  }

  return moment(dateToFormat).format("DD MMMM YYYY [at] h:mm A");
}
