import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { origin: "", destination: "", depDate: "", retDate: "" },
  reducers: {
    setSearchParams: (state, action) => {
      const { origin, destination, depDate, retDate } = action.payload;
      state.origin = origin;
      state.destination = destination;
      state.depDate = depDate;
      state.retDate = retDate;
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
