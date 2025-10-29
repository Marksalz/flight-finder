import SearchSummaryBar from "../components/SearchSummaryBar";
import { Box } from "@mui/material";
import FlightsList from "../components/FlightsList";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlights } from "../features/flights/flightsSlice";

export default function ResultsPage() {
  const searchParams = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights({ searchParams }));
  }, [dispatch, searchParams]);

  const flights = useSelector((state) => state.flights.flights);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <SearchSummaryBar
        from={searchParams.origin}
        to={searchParams.destination}
        date={
          searchParams.depDate &&
          typeof searchParams.depDate.toLocaleString === "function"
            ? searchParams.depDate.toLocaleString()
            : String(searchParams.depDate || "")
        }
      />

      <FlightsList flights={flights} />
    </Box>
  );
}
