import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Container, Typography } from "@mui/material";

import {
  selectAirportById,
  selectAirports,
} from "../features/airports/airportsSlice.js";
import {
  fetchFlightById,
  selectedFlight,
  selectFlightStatus,
} from "../features/flights/flightsSlice.js";
import { STATUSES } from "../utils/consts.js";
import FlightDetailsMapSide from "../components/flightDetailsPage/FlightDetailsMapSide.jsx";
import FlightDetailsCardSide from "../components/flightDetailsPage/FlightDetailsCardSide.jsx";

export default function FlightDetailsPage() {
  const { idle, loading, succeeded, failed } = STATUSES;
  const { flightId } = useParams();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);

  const flight = useSelector(selectedFlight);
  const status = useSelector(selectFlightStatus);
  const airports = useSelector(selectAirports);

  useEffect(() => {
    if (airports?.length !== 0 && (!flight || flight.id !== flightId)) {
      dispatch(fetchFlightById(flightId));
    }
  }, [dispatch, flightId, flight, airports]);

  const originAirport = useSelector(selectAirportById(flight?.origin)) || {};
  const destinationAirport =
    useSelector(selectAirportById(flight?.destination)) || {};

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
      {(status === loading || status === idle) && (
        <Typography>Loading flight...</Typography>
      )}
      {status === failed && <Typography>Error loading flight.</Typography>}
      {status === succeeded && flight && (
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
