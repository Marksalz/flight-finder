import { useParams } from "react-router";
import FlightRouteMap from "../components/FlightRouteMap";
import { allFlights } from "../utils/mockFlights.js";

export default function FlightDetailsPage() {
  const params = useParams();
  const flightId = params.flightId;

  const flight = allFlights.find((flight) => flight.id === flightId);

  return (
    <FlightRouteMap origin={flight.origin} destination={flight.destination} />
  );
}
