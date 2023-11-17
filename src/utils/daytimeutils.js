function formatDate(timestamp, format) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  console.log(timestamp);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleString("vi-VN", options);

  const formatMapping = {
    "dd/MM/yyyy": formattedDate,
    "MM/dd/yyyy": formattedDate,
    "yyyy-MM-dd": formattedDate,
    "HH:mm:ss": formattedDate.slice(11),
    // Add more formats if needed
  };

  return formatMapping[format] || "Invalid Format";
}
export default formatDate;