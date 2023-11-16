export const formatDate = (dateString) => {
  if (!dateString) {
    return;
  }
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };

  const formattedDate = date.toLocaleDateString(undefined, options);

  if (dateString.includes(":")) {
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate}, ${formattedTime}`;
  }

  return formattedDate;
};
