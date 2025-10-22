import "./styles/App.css";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import AirportDetailsPage from "./pages/AirportDetailsPage";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SearchPage />} />
            <Route path="results" element={<ResultsPage />} />
            <Route path="flight/:flightId" element={<FlightDetailsPage />} />
            <Route path="airport/:code" element={<AirportDetailsPage />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
