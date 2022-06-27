export const formatDateTime = (date: Date) => {
  return`${formatDate(date)} - ${formatTime(date)}`;
};

export const formatDate = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return`${months[month]} ${day}, ${year}`;
};

export const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};
