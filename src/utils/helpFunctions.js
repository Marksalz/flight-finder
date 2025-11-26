// Helper to convert ISO string to 'YYYY-MM-DDTHH:mm'
export const toLocalInputValue = (isoString) => {
  let result;
  if (!isoString) result = "";
  else {
    const date = new Date(isoString);
    const pad = (numberToPad) => numberToPad.toString().padStart(2, "0");
    result = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  return result;
};

// Helper to convert 'YYYY-MM-DDTHH:mm' to ISO string (UTC)
export const toISOString = (localValue) => {
  let result;
  if (!localValue) result = "";
  else {
    const date = new Date(localValue);
    result = date.toISOString();
  }
  return result;
};

// Helper function for calculating time given in minutes to hours
export const durationInHours = (durationMinutes) => {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours}h ${minutes}`;
};

//Extracts airline code (first two chars) from flight number
export const getAirlineCode = (flightNumber) =>
  String(flightNumber ?? "").slice(0, 2);

//Returns departure time in HH:mm format from ISO string.
export const getDepartureTime = (departureTime) =>
  toLocalInputValue(departureTime).split("T")[1].slice(0, 5);

//Returns arrival time in HH:mm format from ISO string.
export const getArrivalTime = (arrivalTime) =>
  toLocalInputValue(arrivalTime).split("T")[1].slice(0, 5);

//Formats a date string 'YYYY-MM-DD' to 'DD/MM/YYYY'.
export const formatDate = (dateStr) => {
  let result;
  if (!dateStr) result = "";
  else {
    const [year, month, day] = dateStr.split("-");
    result = `${day}/${month}/${year}`;
  }
  return result;
};

//Formats a numeric amount as a currency string.
export const formatPrice = (amount, currency) => {
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
};

// Helper to remove prefix from flight number
export const prevFlightNumberWithoutPrefix = (flightNumber) => {
  let result;
  if (!flightNumber) result = "";
  else result = flightNumber.slice(2);
  return result;
};

// Function to check if flight matches current filters of search form.
export const matchesFilters = (
  updatedFlight,
  adminSearch,
  searchOriginId,
  searchDestinationId
) => {
  let result = true;
  if (adminSearch) {
    const originMatch = String(updatedFlight.origin) === searchOriginId;
    const destMatch = String(updatedFlight.destination) === searchDestinationId;
    let dateMatch = true;
    if (adminSearch.startDate && adminSearch.endDate) {
      const date = updatedFlight.date;
      dateMatch = date >= adminSearch.startDate && date <= adminSearch.endDate;
    }
    result = originMatch && destMatch && dateMatch;
  }
  return result;
};
