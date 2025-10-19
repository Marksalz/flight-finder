import { Box, Typography } from "@mui/material";

export default function OriginDestination({ airportCode, time }) {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h6">{time}</Typography>
        <Typography variant="h6">{airportCode}</Typography>
      </Box>
    </>
  );
}
