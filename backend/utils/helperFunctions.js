export const findNextAirportId = (airports) => {
  if (!airports || airports.length === 0) return "1";
  const maxId = Math.max(...airports.map((airport) => Number(airport.id) || 0));
  return String(maxId + 1);
};
