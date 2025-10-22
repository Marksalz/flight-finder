import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import "../styles/flightCard.css";
import LongArrow from "./LongArrow";
import OriginDestination from "./OriginDestination";
import { useNavigate } from "react-router";
import { readById } from "../utils/airportCRUD";

export default function FlightCard({ flightInfo, isClickable }) {
  const airlineCode = String(flightInfo?.id ?? "").slice(0, 2);
  const depTime = flightInfo.departureTime.split("T")[1].slice(0, 5);
  const arrTime = flightInfo.arrivalTime.split("T")[1].slice(0, 5);
  const navigate = useNavigate();

  return (
    <Card
      onClick={
        isClickable ? () => navigate(`/flight/${flightInfo.id}`) : undefined
      }
      sx={{
        p: 1,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: { xs: "stretch", sm: "space-evenly" },
        gap: { xs: 2, sm: 4.5 },
        backgroundColor: "lightblue",
        width: "100%",
        height: { xs: "100%", sm: 100 },

        transition: "transform 200ms ease, box-shadow 200ms ease",
        ...(isClickable && {
          borderRadius: 4,
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.03)",
            boxShadow: 6,
            zIndex: 2,
          },
        }),
        ...(!isClickable && {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          cursor: "default",
        }),
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
            airportCode={readById(flightInfo.origin).code}
          />
        </Grid>
        <Grid size="auto">
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: { xs: 24, sm: 36, md: 48 },
            }}
          >
            {/* Arrow line */}
            <LongArrow />

            {/* Duration badge centered on the arrow */}
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "transparent",
                px: 1,
                py: 0.25,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#8f8f8fff", fontWeight: 600 }}
              >
                {durationInHours(flightInfo.durationMinutes)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size="auto">
          <OriginDestination
            time={arrTime}
            airportCode={readById(flightInfo.destination).code}
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
        <Typography variant="body1" sx={{ color: "#4caf50", fontWeight: 800 }}>
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

function durationInHours(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours}h ${minutes}`;
}
