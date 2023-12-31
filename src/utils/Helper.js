import { format, parse } from "date-fns";
function formatDateToLocal(dateString) {
  try {
    const parts = dateString.split("-");
    const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]);
    return format(formattedDate, "dd/MM/yyyy");
  } catch (err) {
    return dateString;
  }
}
function formatDateToVNDate(dateString) {
  try {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    const formattedDate = new Date(year, month - 1, day, hour, minute);
    const formattedTime = format(formattedDate, "hh:mmA");
    const formattedDateTime =
      format(formattedDate, "dd/MM/yyyy") + " " + formattedTime;

    return formattedDateTime;
  } catch (err) {
    return dateString;
  }
}
function formatDateToUTC(dateString) {
  try {
    const parts = dateString.split("/");
    const formattedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(formattedDate, "yyyy-MM-dd");
  } catch (err) {
    return dateString;
  }
}
// Export the helper function
export default {
  formatDateToLocal,
  formatDateToUTC,
  formatDateToVNDate,
};
