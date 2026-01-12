import { configureStore } from "@reduxjs/toolkit";

import airportsReducer from "../features/airports/airportsSlice";
import flightsReducer from "../features/flights/flightsSlice";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    flights: flightsReducer,
    airports: airportsReducer,
  },
});

export default store;
