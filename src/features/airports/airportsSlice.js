import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allAirports } from "../../utils/mockAirports";

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async () => {
    return allAirports;

    // const response = await fetch(`/api/airports`);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch airport");
    // }
    // return await response.json();
  }
);

export const fetchAirportById = createAsyncThunk(
  "airports/fetchAirportById",
  async (airportId) => {
    const airport = allAirports.find((airport) => airport.id === airportId);
    return airport;

    // const response = await fetch(
    //   `/api/airports/${encodeURIComponent(airportId)}`
    // );
    // if (!response.ok) {
    //   throw new Error("Failed to fetch airport");
    // }
    // return await response.json();
  }
);

export const modifyAirport = createAsyncThunk(
  "airports/modifyAirport",
  async ({ airportId, airportData }) => {
    const response = await fetch(
      `/api/airports/modify/${encodeURIComponent(airportId)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(airportData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to modify airport");
    }
    return await response.json();
  }
);

export const selectAirportByCode = (state, code) =>
  state.airports.airports.find((a) => a.code === code);

export const selectAirportById = (state, id) =>
  state.airports.airports.find((a) => a.id === id);

const airportsSlice = createSlice({
  name: "airports",
  initialState: {
    airports: [],
    selectedAirport: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectAirport(state, action) {
      state.selectedAirport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirports.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.airports = action.payload;
      })
      .addCase(fetchAirports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAirportById.fulfilled, (state, action) => {
        state.selectedAirport = action.payload;
      })
      .addCase(modifyAirport.fulfilled, (state, action) => {
        const idx = state.airports.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.airports[idx] = action.payload;
      });
  },
});

export const { selectAirport, setOriginAirport, setDestinationAirport } =
  airportsSlice.actions;
export default airportsSlice.reducer;
