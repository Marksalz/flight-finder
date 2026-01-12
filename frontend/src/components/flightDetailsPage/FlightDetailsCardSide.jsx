import { Grid, Box, Collapse } from "@mui/material";
import { ExpandMoreRounded, ExpandLessRounded } from "@mui/icons-material";

import FlightCard from "../flightCard/FlightCard.jsx";
import DetailedFlightInfo from "../flightDetailsPage/DetailedFlightInfo.jsx";

export default function FlightDetailsCardSide({
  flight,
  isExpanded,
  setIsExpanded,
  originAirport,
  destinationAirport,
}) {
  return (
    <Grid container spacing={0} sx={{ width: { xs: "100%", md: "50%" } }}>
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
            <ExpandMoreRounded
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                "&:hover": {
                  cursor: "pointer",
                  color: "black",
                },
                color: "blue",
              }}
              onClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
            />
          ) : (
            <ExpandLessRounded
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                "&:hover": {
                  cursor: "pointer",
                  color: "black",
                },
                color: "blue",
              }}
              onClick={() => setIsExpanded((prevExpanded) => !prevExpanded)}
            />
          )}
        </Box>
      </Grid>

      <Collapse
        in={isExpanded && originAirport && destinationAirport}
        timeout={400}
        unmountOnExit
        sx={{ width: "100%" }}
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
  );
}
