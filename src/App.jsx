import { fetchAirports } from "./features/airports/airportsSlice";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import Layout from "./components/Layout";

import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
