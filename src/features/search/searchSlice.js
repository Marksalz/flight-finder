import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    userSearch: { origin: "", destination: "", depDate: "", retDate: "" },
    adminSearch: { origin: "", destination: "", startDate: "", endDate: "" },
  },
  reducers: {
    setUserSearchParams: (state, action) => {
      const { origin, destination, depDate, retDate } = action.payload;
      state.origin = origin;
      state.destination = destination;
      state.depDate = depDate;
      state.retDate = retDate;
    },
    clearUserSearchParams(state) {
      state.origin = "";
      state.destination = "";
      state.depDate = "";
      state.retDate = "";
    },
    setAdminSearchParams: (state, action) => {
      const { origin, destination, startDate, endDate } = action.payload;
      state.origin = origin;
      state.destination = destination;
      state.depDate = startDate;
      state.retDate = endDate;
    },
    clearAdminSearchParams(state) {
      state.origin = "";
      state.destination = "";
      state.startDate = "";
      state.endDate = "";
    },
  },
});

export const {
  setUserSearchParams,
  clearUserSearchParams,
  setAdminSearchParams,
  clearAdminSearchParams,
} = searchSlice.actions;
export default searchSlice.reducer;
