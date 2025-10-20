import FlightRouteMap from "../components/flightRouteMap";

const flight = {
  id: "LY001",
  airline: "El Al Israel Airlines",
  flightNumber: "LY001",
  origin: {
    code: "TLV",
    name: "Ben Gurion Intl Airport",
    city: "Tel Aviv",
    country: "Israel",
  },
  destination: {
    code: "JFK",
    name: "John F. Kennedy Intl Airport",
    city: "New York",
    country: "USA",
  },
  departureTime: "2025-10-20T21:30:00.000Z",
  arrivalTime: "2025-10-21T03:30:00.000Z",
  durationMinutes: 720,
  price: { amount: 775, currency: "USD" },
  stops: 0,
  aircraft: "Boeing 787-9",
  terminal: "3",
  date: "2025-10-20",
  baggageAllowance: "23kg + 8kg hand luggage",
};

const airportCoords = {
  TLV: { lat: 32.0114, lng: 34.8867 },
  JFK: { lat: 40.6413, lng: -73.7781 },
};

export default function FlightDetailsPage() {
  return (
    <FlightRouteMap
      origin={airportCoords[flight.origin.code]}
      destination={airportCoords[flight.destination.code]}
      fromLabel={`${flight.origin.city} (${flight.origin.code})`}
      toLabel={`${flight.destination.city} (${flight.destination.code})`}
    />
  );
}
