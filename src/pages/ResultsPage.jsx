import React from "react";
import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightCard from "../components/FlightCard";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  console.log(`state: `, state);

  console.log(`All flights: `, allFlights);

  const flights = allFlights.filter((flight) => {
    return (
      flight.origin.code === from &&
      flight.destination.code === to &&
      flight.date === departDate
    );
  });

  console.log(`Filtered flights: `, flights);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "95vw",
        bgcolor: "background.paper",
        padding: 0,
      }}
    >
      <SearchSummaryBar
        from={from}
        to={to}
        date={departDate.toLocaleString()}
      />
      <FlightCard flightInfo={allFlights[1]} />
    </Box>
  );
}
