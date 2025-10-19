import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import { Box } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightCard from "../components/FlightCard";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  const flights = allFlights.filter((flight) => {
    return (
      flight.origin.code === from &&
      flight.destination.code === to &&
      flight.date === departDate
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        width: "100%",
        padding: 0,
        pt: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "800px" }}>
        <SearchSummaryBar
          from={from}
          to={to}
          date={departDate.toLocaleString()}
        />
        <FlightCard flightInfo={allFlights[1]} />
        <FlightCard flightInfo={allFlights[2]} />
        <FlightCard flightInfo={allFlights[3]} />
        <FlightCard flightInfo={allFlights[4]} />
      </Box>
    </Box>
  );
}
