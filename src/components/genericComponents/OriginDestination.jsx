import { Box, Typography } from "@mui/material";

export default function OriginDestination({
  airportCode,
  time,
  isColumn,
  timeV,
  airportV,
}) {
  return (
    <Box
      display="flex"
      flexDirection={isColumn ? "column" : "row"}
      gap={isColumn ? 0 : 1}
      alignItems="center"
    >
      <Typography variant={timeV}>{time}</Typography>
      <Typography variant={airportV}>{airportCode}</Typography>
    </Box>
  );
}
