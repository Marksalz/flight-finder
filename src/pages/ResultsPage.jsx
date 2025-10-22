import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import { allAirports } from "../utils/mockAirports";
import { Box } from "@mui/material";
import FlightsList from "../components/FlightsList";
import { readById } from "../utils/airportsApi";
import { useSelector } from "react-redux";

export default function ResultsPage() {
  const searchParams = useSelector((state) => state.search);

  const flights = allFlights.filter((flight) => {
    const originAirport = readById(flight.origin);
    const destinationAirport = readById(flight.destination);

    return (
      originAirport.code === searchParams.origin &&
      destinationAirport.code === searchParams.destination &&
      String(flight.date) === String(searchParams.depDate)
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
        from={searchParams.origin}
        to={searchParams.destination}
        date={
          searchParams.depDate &&
          typeof searchParams.depDate.toLocaleString === "function"
            ? searchParams.depDate.toLocaleString()
            : String(searchParams.depDate || "")
        }
      />

      <FlightsList flights={flights} />
    </Box>
  );
}
