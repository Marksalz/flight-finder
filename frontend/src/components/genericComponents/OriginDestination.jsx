import { Box, Typography } from "@mui/material";

export default function OriginDestination({
  airportCode,
  time,
  isColumn,
  timeVariant,
  airportVariant,
}) {
  return (
    <Box
      display="flex"
      flexDirection={isColumn ? "column" : "row"}
      gap={isColumn ? 0 : 1}
      alignItems="center"
    >
      <Typography variant={timeVariant}>{time}</Typography>
      <Typography variant={airportVariant}>{airportCode}</Typography>
    </Box>
  );
}
