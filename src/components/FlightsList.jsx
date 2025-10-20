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
    <Stack
      spacing={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch", // cards will fill the available width
        width: { xs: "100%", sm: "92%", md: "75%" },
        maxWidth: "1100px",
        mx: "auto", // centers the stack
        px: { xs: 2, sm: 3, md: 4 }, // responsive horizontal padding
        mt: { xs: 2, sm: 3 }, // responsive top margin
        mb: { xs: 2, sm: 3 }, // responsive bottom margin
      }}
    >
      {flights.map((f) => (
        <FlightCard key={f.id} flightInfo={f} />
      ))}
    </Stack>
  );
}
