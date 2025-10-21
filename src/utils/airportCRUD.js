import { allAirports } from "./mockAirports";

export function readById(id) {
  return allAirports.filter((airport) => airport.id === id)[0];
}
