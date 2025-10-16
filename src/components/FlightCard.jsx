import { Box, Card, Container, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function FlightCard({ flightInfo }) {
  const airlineCode = String(flightInfo?.id ?? "").slice(0, 2);
  console.log(airlineCode);

  return (
    <>
      <Card
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          backgroundColor: "lightblue",
          width: "100%",
          borderRadius: 0,
        }}
      >
        <img src={`/${airlineCode}.png`} alt="Airline logo" />
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">{flightInfo.departureTime}</Typography>
        </Container>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {flightInfo.origin.code}
          <ArrowForwardIcon sx={{ fontSize: "2rem", mx: 1 }} />
          {flightInfo.destination.code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {flightInfo.departureTime}
        </Typography>
      </Card>
    </>
  );
}
