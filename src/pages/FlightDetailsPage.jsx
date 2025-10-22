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
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: { xs: "flex-start", md: "space-evenly" },
        alignItems: "flex-start",
        ml: 0,
        mr: 0,
        mt: 2,
        mb: 2,
        width: "100%",
        minHeight: "100vh",
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Box sx={{ width: { xs: "100%", md: "50%" }, mb: { xs: 2, md: 0 } }}>
        <FlightRouteMap
          origin={readById(flight.origin)}
          destination={readById(flight.destination)}
        />
      </Box>
      <Grid container spacing={0} sx={{ width: { xs: "100%", md: "50%" } }}>
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
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
              mt: { xs: 2, md: 0 },
              width: { xs: "100%", md: "auto" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isExpanded ? (
              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
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
                  fontSize: { xs: "2rem", md: "3rem" },
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
