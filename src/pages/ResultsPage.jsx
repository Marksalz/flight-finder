import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import { Box } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightCard from "../components/FlightCard";
import FlightsList from "../components/FlightsList";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  const flights = allFlights.filter((flight) => {
    return (
      flight.origin.code === from &&
      flight.destination.code === to &&
      String(flight.date) === String(departDate)
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
        pt: 0,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 2 },
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
        <FlightsList flights={allFlights} />
      </Box>
    </Box>
  );
}
