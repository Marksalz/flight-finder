import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import { allAirports } from "../utils/mockAirports";
import { Box } from "@mui/material";
import FlightsList from "../components/FlightsList";
import { readById } from "../utils/airportsApi";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  const flights = allFlights.filter((flight) => {
    const originAirport = readById(flight.origin);
    const destinationAirport = readById(flight.destination);
    

    return (
      originAirport.code === from &&
      destinationAirport.code === to &&
      String(flight.date) === String(departDate)
    );
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <SearchSummaryBar
        from={from}
        to={to}
        date={
          departDate && typeof departDate.toLocaleString === "function"
            ? departDate.toLocaleString()
            : String(departDate || "")
        }
      />

      <FlightsList flights={flights} />
    </Box>
  );
}
