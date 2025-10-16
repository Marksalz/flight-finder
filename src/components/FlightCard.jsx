import { Box, Card, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "../styles/flightCard.css";
import LongArrow from "./LongArrow";

export default function FlightCard({ flightInfo }) {
  const airlineCode = String(flightInfo?.id ?? "").slice(0, 2);
  const depTime = flightInfo.departureTime.split("T")[1].slice(0, 5);
  const arrTime = flightInfo.arrivalTime.split("T")[1].slice(0, 5);

  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        backgroundColor: "lightblue",
        width: "100%",
        borderRadius: 0,
      }}
    >
      <img
        className="airline_logo"
        src={`/${airlineCode}.png`}
        alt="Airline logo"
      />
      <Grid container alignItems="center" spacing={2}>
        {/* Origin */}
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6">{depTime}</Typography>
            <Typography variant="h6">{flightInfo.origin.code}</Typography>
          </Box>
        </Grid>
        {/* Long Arrow */}
        <Grid item xs>
          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: "100%",
              position: "relative",
              height: "2.5rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "absolute",
                top: "50%",
                left: 0,
                zIndex: 1,
              }}
            />
            <LongArrow />
          </Box>
        </Grid>
        {/* Destination */}
        <Grid item>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="h6">{arrTime}</Typography>
            <Typography variant="h6">{flightInfo.destination.code}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
