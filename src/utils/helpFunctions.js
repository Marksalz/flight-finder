// Helper to convert ISO string to 'YYYY-MM-DDTHH:mm'
export function toLocalInputValue(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISO = new Date(date - tzOffset).toISOString().slice(0, 16);
  return localISO;
}

// Helper to convert 'YYYY-MM-DDTHH:mm' to ISO string (UTC)
export function toISOString(localValue) {
  if (!localValue) return "";
  const date = new Date(localValue);
  return date.toISOString();
}