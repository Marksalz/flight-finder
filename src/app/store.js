import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: searchReducer,
});
