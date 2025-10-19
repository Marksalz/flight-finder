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
      onClick={() => console.log("clicked!!")}
      sx={{
        p: 1,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 4.5 },
        backgroundColor: "lightblue",
        width: "100%",
        minHeight: 100,
        borderRadius: 4,
        transition: "transform 200ms ease, box-shadow 200ms ease",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.03)",
          boxShadow: 6,
          zIndex: 2,
        },
        // Ensure all cards have the same height by using flex and minHeight
        height: "100%",
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
        justifyContent="center"
        flexDirection="row"
        spacing={2}
        width={{ xs: "100%", sm: "60%" }}
        sx={{ textAlign: "left" }}
      >
        <Grid size="auto">
          <OriginDestination
            time={depTime}
            airportCode={flightInfo.origin.code}
          />
        </Grid>
        <Grid size="auto">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "100%",
            }}
          >
            <LongArrow />
          </Box>
        </Grid>
        <Grid size="auto">
          <OriginDestination
            time={arrTime}
            airportCode={flightInfo.destination.code}
          />
        </Grid>
      </Grid>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          display: { xs: "block", sm: "none" },
          my: 1,
          borderColor: "grey.600",
        }}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", sm: "block" }, borderColor: "grey.600" }}
      />

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
