import { Box, Card, Grid, Typography } from "@mui/material";
import "../styles/flightCard.css";
import LongArrow from "./LongArrow";
import OriginDestination from "./OriginDestination";

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
          <OriginDestination
            time={depTime}
            airportCode={flightInfo.origin.code}
          />
        </Grid>
        {/* Long Arrow */}
        <Grid item xs>
          <LongArrow />
        </Grid>
        {/* Destination */}
        <Grid item>
          <OriginDestination
            time={arrTime}
            airportCode={flightInfo.destination.code}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
