import { useLocation } from "react-router";
import SearchSummaryBar from "../components/SearchSummaryBar";
import { allFlights } from "../utils/mockFlights";

export default function ResultsPage() {
  const { state } = useLocation();
  const { from, to, departDate, returnDate } = state || {};

  const flights = allFlights.filter((flight) => {
    return (
      flight.origin.code === from &&
      flight.destination.code === to &&
      flight.date === departDate
    );
  });

  return (
    <>
      <SearchSummaryBar
        from={from}
        to={to}
        date={departDate.toLocaleString()}
      />
      {/* Render flights here */}
    </>
  );
}
