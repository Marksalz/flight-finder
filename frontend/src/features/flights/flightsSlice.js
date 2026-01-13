import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectAirportByCode } from "../airports/airportsSlice";
import { BASE_URL, STATUSES } from "../../utils/consts";
import { matchesFilters } from "../../utils/helpFunctions";

const { idle, loading, succeeded, failed } = STATUSES;

//Fetching the flights by date range, or specific date if searching for a flight.
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async ({ searchParams }, { getState }) => {
    const state = getState();

    const airports = state.airports.airports;
    const originId = airports.find(
      ({ code }) => code === searchParams.origin
    )?.id;
    const destinationId = airports.find(
      ({ code }) => code === searchParams.destination
    )?.id;

    let query = `origin=${encodeURIComponent(
      originId
    )}&destination=${encodeURIComponent(destinationId)}`;

    // If search came from search form params state
    if (searchParams.depDate) {
      query += `&date=${encodeURIComponent(searchParams.depDate)}`;
      const response = await fetch(`${BASE_URL}/flights?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      return await response.json();

      // else if search came from admin filtering by start-end date range
    } else if (searchParams.startDate && searchParams.endDate) {
      const start = searchParams.startDate;
      const end = searchParams.endDate;

      query += `&start_date=${encodeURIComponent(
        start
      )}&end_date=${encodeURIComponent(end)}`;

      const response = await fetch(`${BASE_URL}/flights?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      return await response.json();
    }
  }
);

export const fetchFlightById = createAsyncThunk(
  "flights/fetchFlightById",
  async (flightId) => {
    const response = await fetch(`${BASE_URL}/flights/${flightId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch flight");
    }
    return await response.json();
  }
);

export const createFlight = createAsyncThunk(
  "flights/createFlight",
  async (flightData) => {
    const response = await fetch(`${BASE_URL}/flights`, {
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
  async ({ flightId, flightData }, { getState }) => {
    const response = await fetch(
      `${BASE_URL}/flights/${encodeURIComponent(flightId)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to modify flight");
    }

    const updatedFlight = await response.json();
    const state = getState();
    const adminSearch = state.search.adminSearch;

    // find the ids of the origin and destination from the admin search form
    const searchOriginId = selectAirportByCode(adminSearch.origin)?.id;
    const searchDestinationId = selectAirportByCode(
      adminSearch.destination
    )?.id;

    return { updatedFlight, searchOriginId, searchDestinationId, adminSearch };
  }
);

export const removeFlight = createAsyncThunk(
  "flights/removeFlight",
  async (flightId) => {
    const response = await fetch(
      `${BASE_URL}/flights/${encodeURIComponent(flightId)}`,
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
    status: idle,
    error: null,
  },
  reducers: {
    selectFlight(state, action) {
      state.selectedFlight = action.payload;
    },
    clearSelectedFlight(state) {
      state.selectedFlight = null;
    },
    clearFlights(state) {
      state.flights = [];
    },
  },
  selectors: {
    selectedFlight: (state) => state.selectedFlight,
    selectFlights: (state) => state.flights,
    selectFlightStatus: (state) => state.status,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.flights = action.payload;
      })
      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.selectedFlight = action.payload;
      })
      .addCase(modifyFlight.fulfilled, (state, action) => {
        const {
          updatedFlight,
          searchOriginId,
          searchDestinationId,
          adminSearch,
        } = action.payload;

        if (
          matchesFilters(
            updatedFlight,
            adminSearch,
            searchOriginId,
            searchDestinationId
          )
        ) {
          const idx = state.flights.findIndex(
            ({ id }) => id === updatedFlight.id
          );
          if (idx !== -1) state.flights[idx] = updatedFlight;
        } else {
          state.flights = state.flights.filter(
            ({ id }) => id !== updatedFlight.id
          );
        }
      })
      .addCase(removeFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter(
          ({ id }) => id !== action.payload.id
        );
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

export const { selectFlight, clearSelectedFlight, clearFlights } =
  flightsSlice.actions;
export const { selectedFlight, selectFlights, selectFlightStatus } =
  flightsSlice.selectors;
export default flightsSlice.reducer;
