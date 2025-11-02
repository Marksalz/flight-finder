import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allFlights } from "../../utils/mockFlights";
import LongArrow from "../../components/LongArrow";

const baseUrl = "http://localhost:3000";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async ({ searchParams }, { getState }) => {
    const state = getState();

    const airports = state.airports.airports;
    const originId = airports.find((a) => a.code === searchParams.origin).id;

    const destinationId = airports.find(
      (a) => a.code === searchParams.destination
    ).id;

    // const filtered = [];
    // for (const flight of allFlights) {
    //   const originAirport = airports.find((a) => a.id === flight.origin);
    //   const destinationAirport = airports.find(
    //     (a) => a.id === flight.destination
    //   );

    //   if (
    //     originAirport?.code === searchParams.origin &&
    //     destinationAirport?.code === searchParams.destination &&
    //     String(flight.date) === String(searchParams.depDate)
    //   ) {
    //     filtered.push(flight);
    //   }
    // }

    // return filtered;

    const response = await fetch(
      `${baseUrl}/flights?origin=${encodeURIComponent(
        originId
      )}&destination=${encodeURIComponent(
        destinationId
      )}&date=${encodeURIComponent(searchParams.depDate)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch flights");
    }
    return await response.json();
  }
);

export const fetchFlightById = createAsyncThunk(
  "flights/fetchFlightById",
  async (flightId) => {
    // const flight = allFlights.find((flight) => flight.id === flightId);

    // return flight;

    const response = await fetch(`${baseUrl}/flights/${flightId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch flight");
    }
    return await response.json();
  }
);

export const createFlight = createAsyncThunk(
  "flights/createFlight",
  async (flightData) => {
    const response = await fetch(`${baseUrl}/flights`, {
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
      `${baseUrl}/flights/${encodeURIComponent(flightId)}`,
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
      `${baseUrl}/flights/${encodeURIComponent(flightId)}`,
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
      .addCase(fetchFlightById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFlightById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedFlight = action.payload;
      })
      .addCase(fetchFlightById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(modifyFlight.fulfilled, (state, action) => {
        const idx = state.flights.findIndex((f) => f.id === action.payload.id);
        if (idx !== -1) state.flights[idx] = action.payload;
      })
      .addCase(removeFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((f) => f.id !== action.payload.id);
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload);
      });
  },
});

export const { selectFlight } = flightsSlice.actions;
export default flightsSlice.reducer;
