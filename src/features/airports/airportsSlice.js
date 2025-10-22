const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
  name: "search",
  initialState: { origin: "", destination: "", date: "" },
  reducers: {
    setSearchParams: (state, action) => {
      const { origin, destination, date } = action.payload;
      state.origin = origin;
      state.destination = destination;
      state.date = date;
    },
  },
});

export const { setSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
