import { fetchFlights } from "../features/flights/flightsSlice";
import SearchSummaryBar from "../components/searchPage/SearchSummaryBar";
import FlightsList from "../components/genericComponents/FlightsList";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Box } from "@mui/material";

export default function ResultsPage() {
  const dispatch = useDispatch();

  const searchParams = useSelector((state) => state.search.userSearch);

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
