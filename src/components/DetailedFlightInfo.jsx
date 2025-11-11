import { Grid, Box, Divider, Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import OriginDestination from "./OriginDestination";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import { toLocalInputValue } from "../utils/helpFunctions";

export default function DetailedFlightInfo({
  flightInfo,
  originCode,
  destinationCode,
  originAirportName,
  destinationAirportName,
}) {
  const airlineCode = String(flightInfo?.flightNumber ?? "").slice(0, 2);
  const depTime = toLocalInputValue(flightInfo.departureTime)
    .split("T")[1]
    .slice(0, 5);
  const arrTime = toLocalInputValue(flightInfo.arrivalTime)
    .split("T")[1]
    .slice(0, 5);

  return (
    <Box
      sx={{
        bgcolor: "#b6ccecff",
        width: "100%",
        minHeight: 300,
        p: 2,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box
          component="img"
          src={`/${airlineCode}.png`}
          alt={`${airlineCode} logo`}
          sx={{
            width: 48,
            maxWidth: 80,
            objectFit: "contain",
          }}
        />
        <Typography variant="body2">{flightInfo.flightNumber}</Typography>
        <Typography variant="body2">{flightInfo.airline}</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: "row",
          alignItems: "flex-start",
          flexWrap: "nowrap",
        }}
      >
        <Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "200px",
              width: "5px",
              bgcolor: "black",
              marginRight: 2,
              borderRadius: "5px",
            }}
          />
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <Grid container flexDirection={"row"} spacing={1}>
            <OriginDestination
              airportCode={originCode}
              time={depTime}
              isColumn={false}
              timeV={"body1"}
              airportV={"body1"}
            />
            <Typography variant="body1">{originAirportName}</Typography>
          </Grid>
          <Grid container flexDirection={"row"} spacing={0.5}>
            <TimelapseIcon fontSize="small" sx={{ color: "#8f8f8fff" }} />
            <Typography
              variant="body2"
              sx={{ color: "#8f8f8fff", fontWeight: 600 }}
            >
              {durationInHours(flightInfo.durationMinutes)}
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body2">{flightInfo.aircraft}</Typography>
          </Grid>
          <Grid container flexDirection={"row"} spacing={1}>
            <OriginDestination
              airportCode={destinationCode}
              time={arrTime}
              isColumn={false}
              timeV={"body1"}
              airportV={"body1"}
            />
            <Typography variant="body1">{destinationAirportName}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function durationInHours(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours}h ${minutes}`;
}
