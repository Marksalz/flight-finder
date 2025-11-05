import { useParams } from "react-router";
import FlightRouteMap from "../components/FlightRouteMap";
import FlightCard from "../components/FlightCard.jsx";
import { Box, Container, Grid, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAirportById } from "../features/airports/airportsSlice.js";
import { fetchFlightById } from "../features/flights/flightsSlice.js";
import DetailedFlightInfo from "../components/DetailedFlightInfo.jsx";
import Collapse from "@mui/material/Collapse";

export default function FlightDetailsPage() {
  const dispatch = useDispatch();
  const { flightId } = useParams();
  const { status } = useSelector((state) => state.flights);
  const [isExpanded, setIsExpanded] = useState(false);

  const flight = useSelector((state) => state.flights.selectedFlight);
  const airports = useSelector((state) => state.airports.airports);

  useEffect(() => {
    if (airports?.length !== 0 && (!flight || flight.id !== flightId)) {
      dispatch(fetchFlightById(flightId));
    }
  }, [dispatch, flightId, flight, airports]);

  const originAirport =
    useSelector((state) =>
      flight ? selectAirportById(state, flight?.origin) : null
    ) || {};
  const destinationAirport =
    useSelector((state) =>
      flight ? selectAirportById(state, flight?.destination) : null
    ) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        justifyContent: { xs: "flex-start", md: "space-evenly" },
        alignItems: "flex-start",
        backgroundColor: "#cfdef390",
        borderRadius: 4,
        mt: 2,
        mb: 2,
        width: "100%",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {(status === "loading" || status === "idle") && (
        <Typography>Loading flight...</Typography>
      )}
      {status === "failed" && <Typography>Error loading flight.</Typography>}
      {status === "succeeded" && flight && (
        <>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              mb: { xs: 2, md: 0 },
            }}
          >
            <FlightRouteMap
              origin={originAirport}
              destination={destinationAirport}
            />
          </Box>

          <Grid
            container
            spacing={0}
            sx={{
              width: { xs: "100%", md: "50%" },
            }}
          >
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <FlightCard
                flightInfo={flight}
                isClickable={false}
                isExpanded={isExpanded}
              />
              <Box
                sx={{
                  bgcolor: "#b6ccecff",
                  height: { xs: "10%", md: "100%" },
                  alignContent: "center",
                  borderTopRightRadius: { xs: 0, md: 16 },
                  borderBottomRightRadius: isExpanded ? 0 : 16,
                  borderBottomLeftRadius: { xs: isExpanded ? 0 : 16, md: 0 },
                  width: { xs: "100%", md: "10%" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "border-radius 0.4s",
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
                    onClick={() => setIsExpanded((t) => !t)}
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
                    onClick={() => setIsExpanded((t) => !t)}
                  />
                )}
              </Box>
            </Grid>

            <Collapse
              in={isExpanded && originAirport && destinationAirport}
              timeout={400}
              unmountOnExit
              sx={{
                width: "100%",
              }}
            >
              <Grid>
                <DetailedFlightInfo
                  flightInfo={flight}
                  originCode={originAirport?.code}
                  destinationCode={destinationAirport?.code}
                  originAirportName={originAirport?.name}
                  destinationAirportName={destinationAirport?.name}
                />
              </Grid>
            </Collapse>
          </Grid>
        </>
      )}
    </Container>
  );
}
