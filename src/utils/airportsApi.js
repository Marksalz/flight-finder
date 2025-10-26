import { allAirports } from "./mockAirports";

export async function fetchAirportById(id) {
  return allAirports.filter((airport) => airport.id === id)[0];
  // const response = await fetch(`/api/airports/${id}`);
  // if (!response.ok) throw new Error("Network response was not ok");
  // return await response.json();
}
