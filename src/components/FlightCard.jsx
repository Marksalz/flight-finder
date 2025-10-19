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
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "flex-start",
        gap: { xs: 2, sm: 4 },
        backgroundColor: "lightblue",
        width: "100%",
        borderRadius: 4,
      }}
    >
      <Box
        component="img"
        src={`/${airlineCode}.png`}
        alt={`${airlineCode} logo`}
        sx={{
          width: { xs: 80, sm: "10%" },
          maxWidth: 80,
          alignSelf: { xs: "center", sm: "auto" },
          objectFit: "contain",
        }}
      />

      <Grid
        container
        alignItems="center"
        flexDirection="row" // keep it horizontal even on mobile
        spacing={2}
        width={{ xs: "100%", sm: "60%" }}
        sx={{ textAlign: "left" }} // keep text left-aligned
      >
        {/* Origin */}
        <Grid size="auto">
          <OriginDestination
            time={depTime}
            airportCode={flightInfo.origin.code}
          />
        </Grid>

        {/* Long Arrow */}
        <Grid size="auto">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "100%"
            }}
          >
            <LongArrow />
          </Box>
        </Grid>

        {/* Destination */}
        <Grid size="auto">
          <OriginDestination
            time={arrTime}
            airportCode={flightInfo.destination.code}
          />
        </Grid>
      </Grid>

      {/* Horizontal divider for small screens */}
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          display: { xs: "block", sm: "none" },
          my: 1,
          borderColor: "grey.600",
        }}
      />

      {/* Vertical Divider for sm+ */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", sm: "block" }, borderColor: "grey.600" }}
      />

      {/* price */}
      <Box
        sx={{
          width: { xs: "100%", sm: "auto" },
          display: "flex",
          justifyContent: { xs: "flex-end", sm: "flex-start" },
          alignItems: "center",
          mt: { xs: 1, sm: 0 },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {formatPrice(flightInfo.price.amount, flightInfo.price.currency)}
        </Typography>
      </Box>
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
