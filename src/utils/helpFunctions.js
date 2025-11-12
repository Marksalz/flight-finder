// Helper to convert ISO string to 'YYYY-MM-DDTHH:mm'
export function toLocalInputValue(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);

  // Get local components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
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

