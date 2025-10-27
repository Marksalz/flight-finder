import { Box, Typography } from "@mui/material";

export default function OriginDestination({ airportCode, time, isColumn }) {
  return (
    <Box
      display="flex"
      flexDirection={isColumn ? "column" : "row"}
      gap={isColumn ? 0 : 2}
      alignItems="center"
    >
      <Typography variant="body1">{time}</Typography>
      <Typography variant="h5">{airportCode}</Typography>
    </Box>
  );
}
