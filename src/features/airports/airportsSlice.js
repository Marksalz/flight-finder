import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allAirports } from "../../utils/mockAirports";

const baseUrl = "http://localhost:3000";

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async () => {
    // return allAirports;

    const response = await fetch(`${baseUrl}/airports`);
    if (!response.ok) {
      throw new Error("Failed to fetch airport");
    }
    return await response.json();
  }
);

export const fetchAirportById = createAsyncThunk(
  "airports/fetchAirportById",
  async (airportId) => {
    // const airport = allAirports.find((airport) => airport.id === airportId);
    // return airport;

    const response = await fetch(
      `${baseUrl}/airports/${encodeURIComponent(airportId)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch airport");
    }
    return await response.json();
  }
);

export const modifyAirport = createAsyncThunk(
  "airports/modifyAirport",
  async ({ airportId, airportData }) => {
    const response = await fetch(
      `${baseUrl}/airports/${encodeURIComponent(airportId)}`,
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

export const createAirport = createAsyncThunk(
  "airports/createAirport",
  async (airportData) => {
    const response = await fetch(`${baseUrl}/airports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(airportData),
    });
    if (!response.ok) {
      throw new Error("Failed to create airport");
    }
    return await response.json();
  }
);

export const selectAirportByCode = (state, code) =>
  state.airports.airports.find((a) => a.code === code);

export const selectAirportById = (state, id) =>
  state.airports.airports.find((a) => a.id === String(id));

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
      .addCase(fetchAirports.fulfilled, (state, action) => {
        state.airports = action.payload;
      })
      .addCase(fetchAirportById.fulfilled, (state, action) => {
        state.selectedAirport = action.payload;
      })
      .addCase(modifyAirport.fulfilled, (state, action) => {
        const idx = state.airports.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.airports[idx] = action.payload;
      })
      .addCase(createAirport.fulfilled, (state, action) => {
        state.airports.push(action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { selectAirport, setOriginAirport, setDestinationAirport } =
  airportsSlice.actions;
export default airportsSlice.reducer;
