import { Box } from "@mui/material";

import FlightRouteMap from "../flightDetailsPage/FlightRouteMap.jsx";

export default function FlightDetailsMapSide({
  originAirport,
  destinationAirport,
}) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "50%" },
        mb: { xs: 2, md: 0 },
      }}
    >
      <FlightRouteMap origin={originAirport} destination={destinationAirport} />
    </Box>
  );
}
