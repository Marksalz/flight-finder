import { Box, Typography } from "@mui/material";

import TimelineArrow from "./TimelineArrow";

export default function FlightCardRoute({
  departureTime,
  arrivalTime,
  originCode,
  destinationCode,
  duration,
  date,
  isClickable,
  OriginDestination,
}) {
  return (
    <>
      <OriginDestination
        time={departureTime}
        airportCode={originCode}
        isColumn={true}
        timeVariant={"body1"}
        airportVariant={"h5"}
      />
      <TimelineArrow
        duration={duration}
        date={date}
        isClickable={isClickable}
      />
      <OriginDestination
        time={arrivalTime}
        airportCode={destinationCode}
        isColumn={true}
        timeVariant={"body1"}
        airportVariant={"h5"}
      />
    </>
  );
}
