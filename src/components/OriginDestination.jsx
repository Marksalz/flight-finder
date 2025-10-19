import { Box, Typography } from "@mui/material";

export default function OriginDestination({ airportCode, time }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Typography variant="body1">{time}</Typography>
      <Typography variant="h5">{airportCode}</Typography>
    </Box>
  );
}
