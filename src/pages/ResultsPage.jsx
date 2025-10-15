import SearchSummaryBar from "../components/SearchSummaryBar";

export default function ResultsPage({ from, to, departDate, returnDate }) {
  return (
    <>
      <SearchSummaryBar from={from} to={to} date={departDate} />
    </>
  );
}
