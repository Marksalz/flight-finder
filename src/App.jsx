import "./styles/App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import AirportDetailsPage from "./pages/AirportDetailsPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAirports } from "./features/airports/airportsSlice";
import AdminPage from "./pages/AdminPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAirports());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="flight/:flightId" element={<FlightDetailsPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="airport/:code" element={<AirportDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
