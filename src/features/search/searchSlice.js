import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSearch: { origin: "", destination: "", depDate: "", retDate: "" },
  adminSearch: { origin: "", destination: "", startDate: "", endDate: "" },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setUserSearchParams: (state, action) => {
      const { origin, destination, depDate, retDate } = action.payload;
      state.userSearch.origin = origin;
      state.userSearch.destination = destination;
      state.userSearch.depDate = depDate;
      state.userSearch.retDate = retDate;
    },
    setAdminSearchParams: (state, action) => {
      const { origin, destination, startDate, endDate } = action.payload;
      state.adminSearch.origin = origin;
      state.adminSearch.destination = destination;
      state.adminSearch.startDate = startDate;
      state.adminSearch.endDate = endDate;
    },
    clearSearchParams: (state) => {
      state.userSearch = {
        origin: "",
        destination: "",
        depDate: "",
        retDate: "",
      };
      state.adminSearch = {
        origin: "",
        destination: "",
        startDate: "",
        endDate: "",
      };
    },
  },
});

export const { setUserSearchParams, setAdminSearchParams, clearSearchParams } =
  searchSlice.actions;
export default searchSlice.reducer;
