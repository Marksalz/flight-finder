import "./styles/App.css";
import { Routes, Route } from "react-router";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import AirportDetailsPage from "./pages/AirportDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/flight/:flightId" element={<FlightDetailsPage />} />
        <Route path="/airport/:code" element={<AirportDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
