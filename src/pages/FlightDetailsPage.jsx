import { Container, Typography } from "@mui/material";

import { selectAirportById } from "../features/airports/airportsSlice.js";
import { fetchFlightById } from "../features/flights/flightsSlice.js";
import FlightDetailsMapSide from "../components/flightDetails/FlightDetailsMapSide.jsx";
import FlightDetailsCardSide from "../components/flightDetails/FlightDetailsCardSide.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function FlightDetailsPage() {
  const { flightId } = useParams();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);

  const flight = useSelector((state) => state.flights.selectedFlight);
  const airports = useSelector((state) => state.airports.airports);
  const { status } = useSelector((state) => state.flights);

  useEffect(() => {
    if (airports?.length !== 0 && (!flight || flight.id !== flightId)) {
      dispatch(fetchFlightById(flightId));
    }
  }, [dispatch, flightId, flight, airports]);

  const originAirport =
    useSelector((state) =>
      flight ? selectAirportById(state, flight?.origin) : null
    ) || {};
  const destinationAirport =
    useSelector((state) =>
      flight ? selectAirportById(state, flight?.destination) : null
    ) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: { xs: "flex-start", md: "space-evenly" },
        alignItems: "flex-start",
        backgroundColor: "#cfdef390",
        borderRadius: 4,
        mt: 2,
        mb: 2,
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {(status === "loading" || status === "idle") && (
        <Typography>Loading flight...</Typography>
      )}
      {status === "failed" && <Typography>Error loading flight.</Typography>}
      {status === "succeeded" && flight && (
        <>
          <FlightDetailsMapSide
            originAirport={originAirport}
            destinationAirport={destinationAirport}
          />
          <FlightDetailsCardSide
            flight={flight}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            originAirport={originAirport}
            destinationAirport={destinationAirport}
          />
        </>
      )}
    </Container>
  );
}
