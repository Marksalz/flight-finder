import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FlightCard from "./FlightCard";

export default function FlightsList({ flights = [] }) {
  if (flights.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          No flights found for the selected route and date.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      {flights.map((f) => (
        <FlightCard key={f.id} flightInfo={f} />
      ))}
    </Stack>
  );
}
