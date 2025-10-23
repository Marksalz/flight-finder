import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allFlights } from "../../utils/mockFlights";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async ({ origin, destination, date }) => {
    const response = await fetch(
      `/api/flights?origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(
        destination
      )}&date=${encodeURIComponent(date)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }
    return await response.json();
  }
);

export const createFlight = createAsyncThunk(
  "flights/createFlight",
  async (flightData) => {
    const response = await fetch("/api/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flightData),
    });
    if (!response.ok) {
      throw new Error("Failed to create flight");
    }
    return await response.json();
  }
);

export const modifyFlight = createAsyncThunk(
  "flights/modifyFlight",
  async ({ flightId, flightData }) => {
    const response = await fetch(
      `/api/flights/${encodeURIComponent(flightId)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to modify flight");
    }
    return await response.json();
  }
);

export const removeFlight = createAsyncThunk(
  "flights/removeFlight",
  async (flightId) => {
    const response = await fetch(
      `/api/flights/${encodeURIComponent(flightId)}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove flight");
    }
    return await response.json();
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: [],
    selectedFlight: null,
    status: "idle",
    error: null,
  },
  reducers: {
    selectFlight(state, action) {
      state.selectedFlight = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.flights = [];
      })
      .addCase(modifyFlight.fulfilled, (state, action) => {
        const idx = state.flights.findIndex((f) => f.id === action.payload.id);
        if (idx !== -1) state.flights[idx] = action.payload;
      })
      .addCase(removeFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((f) => f.id !== action.payload.id);
      });
  },
});

export const { selectFlight } = flightsSlice.actions;
export default flightsSlice.reducer;
