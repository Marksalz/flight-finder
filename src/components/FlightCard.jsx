import { Box, Card, Divider, Grid, Typography } from "@mui/material";
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
        style={{ width: "10%" }}
      />
      <Grid container alignItems="center" spacing={2} width={"60%"}>
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

      {/* Vertical Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "grey.600" }}
      />

      {/* price */}
      <Typography variant="body1" width={"5%"}>
        {formatPrice(flightInfo.price.amount, flightInfo.price.currency)}
      </Typography>
    </Card>
  );
}

function formatPrice(amount, currency) {
  const numericAmount = Number(amount);
  let formattedPrice;

  try {
    formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(numericAmount);
  } catch {
    formattedPrice = `${numericAmount} ${currency || ""}`.trim();
  }

  return formattedPrice;
}
