import moment from "moment";

export const formatDate = (dateString: string, format = "YYYY-MM-DD") => {
  if (!dateString) return "";
  const parsedDateTime = moment(dateString);
  const formattedDateTime = parsedDateTime.format(format);
  return formattedDateTime;
};

export const formatTime = (dateString: string, format = "HH:mm:ss") => {
  if (!dateString) return "";
  const parsedDateTime = moment(dateString);
  const formattedDateTime = parsedDateTime.format(format);
  return formattedDateTime;
};

export const formatYear = (creator_last_seen: string) => {
  if (!creator_last_seen) return "";
  const parsedDateTime = moment(creator_last_seen);
  const formattedDateTime = parsedDateTime.format("YYYY");

  return formattedDateTime;
};

export function getHoursDifference(date1: any, date2: any) {
  // Get the absolute difference in milliseconds
  const diffInMilliseconds = Math.abs(date2 - date1);

  // Convert milliseconds to total seconds
  const totalSeconds = Math.floor(diffInMilliseconds / 1000);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}
