export async function read(origin, destination, date) {
  const response = await fetch(
    `/api/flights?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(
      date
    )}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }
  return await response.json();
}

export async function create(flightData) {
  const response = await fetch("/api/flights", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flightData),
  });
  if (!response.ok) {
    throw new Error("Failed to create flight");
  }
  return await response.json();
}

export async function modify(flightId, flightData) {
  const response = await fetch(`/api/flights/${encodeURIComponent(flightId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flightData),
  });
  if (!response.ok) {
    throw new Error("Failed to modify flight");
  }
  return await response.json();
}

export async function remove(flightId) {
  const response = await fetch(`/api/flights/${encodeURIComponent(flightId)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to remove flight");
  }
  return await response.json();
}

