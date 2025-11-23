// Helper to convert ISO string to 'YYYY-MM-DDTHH:mm'
export function toLocalInputValue(isoString) {
  if (!isoString) return "";

  const date = new Date(isoString);
  const pad = (numberToPad) => numberToPad.toString().padStart(2, "0");

  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}` +
    `-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
}

// Helper to convert 'YYYY-MM-DDTHH:mm' to ISO string (UTC)
export function toISOString(localValue) {
  if (!localValue) return "";
  const date = new Date(localValue);
  return date.toISOString();
}

// Helper function for calculating time given in minutes to hours
export function durationInHours(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours}h ${minutes}`;
}

//Extracts airline code (first two chars) from flight number
export function getAirlineCode(flightNumber) {
  return String(flightNumber ?? "").slice(0, 2);
}

//Returns departure time in HH:mm format from ISO string.
export function getDepTime(departureTime) {
  return toLocalInputValue(departureTime).split("T")[1].slice(0, 5);
}

//Returns arrival time in HH:mm format from ISO string.
export function getArrTime(arrivalTime) {
  return toLocalInputValue(arrivalTime).split("T")[1].slice(0, 5);
}

//Formats a date string 'YYYY-MM-DD' to 'DD/MM/YYYY'.
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

//Formats a numeric amount as a currency string.
export function formatPrice(amount, currency) {
  const numericAmount = Number(amount);
  let formattedPrice;
  try {
    formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    formattedPrice = `${numericAmount} ${currency || ""}`.trim();
  }

  return formattedPrice;
}
