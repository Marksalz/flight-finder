import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

import { BASE_URL, status } from "../../utils/consts";

const { loading, succeeded, failed } = status;

export const fetchAirports = createAsyncThunk(
  "airports/fetchAirports",
  async () => {
    const response = await fetch(`${BASE_URL}/airports`);
    if (!response.ok) {
      throw new Error("Failed to fetch airport");
    }
    return await response.json();
  }
);

export const fetchAirportById = createAsyncThunk(
  "airports/fetchAirportById",
  async (airportId) => {
    const response = await fetch(
      `${BASE_URL}/airports/${encodeURIComponent(airportId)}`
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
      `${BASE_URL}/airports/${encodeURIComponent(airportId)}`,
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
    const response = await fetch(`${BASE_URL}/airports`, {
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

export const selectAirports = (state) => state.airports.airports;

export const selectAirportById = (airportId) =>
  createSelector([selectAirports], (airports) =>
    airports.find(({ id }) => id === String(airportId))
  );

export const selectAirportByCode = (airportCode) =>
  createSelector([selectAirports], (airports) =>
    airports.find(({ code }) => code === airportCode)
  );

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
        const idx = state.airports.findIndex(
          ({ id }) => id === action.payload.id
        );
        if (idx !== -1) state.airports[idx] = action.payload;
      })
      .addCase(createAirport.fulfilled, (state, action) => {
        state.airports.push(action.payload);
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = loading;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = succeeded;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = failed;
          state.error = action.error.message;
        }
      );
  },
});

export const { selectAirport } = airportsSlice.actions;
export default airportsSlice.reducer;
