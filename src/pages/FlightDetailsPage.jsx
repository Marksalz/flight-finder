import { useParams } from "react-router";
import FlightRouteMap from "../components/FlightRouteMap";
import { allFlights } from "../utils/mockFlights.js";
import FlightCard from "../components/FlightCard.jsx";
import { Box, Container, Grid, Card } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { useState } from "react";
import { readById } from "../utils/airportsApi.js";

export default function FlightDetailsPage() {
  const params = useParams();
  const flightId = params.flightId;
  const flight = allFlights.find((flight) => flight.id === flightId);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        ml: 0,
        mr: 0,
        mt: 2,
        mb: 2,
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <FlightRouteMap
          origin={readById(flight.origin)}
          destination={readById(flight.destination)}
        />
      </Box>
      <Grid container spacing={0} sx={{ width: "50%" }}>
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlightCard flightInfo={flight} isClickable={false} />
          <Box
            sx={{
              bgcolor: "lightblue",
              height: "100%",
              alignContent: "center",
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
            }}
          >
            {!isExpanded ? (
              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: "3rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: "black",
                  },
                  color: "blue",
                }}
                onClick={() => {
                  setIsExpanded((t) => !t);
                }}
              />
            ) : (
              <ExpandLessRoundedIcon
                sx={{
                  fontSize: "3rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: "black",
                  },
                  color: "blue",
                }}
                onClick={() => {
                  setIsExpanded((t) => !t);
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
