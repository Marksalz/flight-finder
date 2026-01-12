export const findNextId = (collection) => {
  if (!collection || collection.length === 0) return "1";
  const maxId = Math.max(
    ...collection.map((airport) => Number(airport.id) || 0)
  );
  return String(maxId + 1);
};
