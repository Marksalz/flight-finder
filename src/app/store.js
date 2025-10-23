import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import flightsReducer from "../features/flights/flightsSlice";
import airportsReducer from "../features/airports/airportsSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    flights: flightsReducer,
    airports: airportsReducer,
  },
});

export default store;
