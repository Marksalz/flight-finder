import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allFlights } from "../../utils/mockFlights";
import LongArrow from "../../components/LongArrow";

const baseUrl = "http://localhost:3000";

//Fetching the flights by date range for now before backend
export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async ({ searchParams }, { getState }) => {
    const state = getState();

    const airports = state.airports.airports;
    const originId = airports.find((a) => a.code === searchParams.origin)?.id;
    const destinationId = airports.find(
      (a) => a.code === searchParams.destination
    )?.id;

    let query = `origin=${encodeURIComponent(
      originId
    )}&destination=${encodeURIComponent(destinationId)}`;

    //     // Add date or date range to query
    //     if (searchParams.startDate && searchParams.endDate) {
    //       const start = searchParams.startDate.format("YYYY-MM-DD");
    //       const end = searchParams.endDate.format("YYYY-MM-DD");
    //       query += `&date_gte=${encodeURIComponent(
    //         start
    //       )}&date_lte=${encodeURIComponent(end)}`;
    //     }

    // If search came from search form params state
    if (searchParams.depDate) {
      query += `&date=${encodeURIComponent(searchParams.depDate)}`;
      const response = await fetch(`${baseUrl}/flights?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      return await response.json();
    } else {
      // Fetch everything from json-server (no date filtering yet)
      const response = await fetch(`${baseUrl}/flights?${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      let flights = await response.json();

      // Manual filtering by date or date range (client-side)
      if (searchParams.startDate && searchParams.endDate) {
        const start = searchParams.startDate;
        const end = searchParams.endDate;
        //.format("YYYY-MM-DD")

        flights = flights.filter((f) => {
          const flightDate = f.date.slice(0, 10);
          return flightDate >= start && flightDate <= end;
        });
      }
      return flights;
    }
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
    clearSelectedFlight(state) {
      state.selectedFlight = null;
    },
    clearFlights(state) {
      state.flights = [];
    },
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
        const idx = state.flights.findIndex((f) => f.id === action.payload.id);
        if (idx !== -1) state.flights[idx] = action.payload;
      })
      .addCase(removeFlight.fulfilled, (state, action) => {
        state.flights = state.flights.filter((f) => f.id !== action.payload.id);
      })
      .addCase(createFlight.fulfilled, (state, action) => {
        state.flights.push(action.payload);
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

export const { selectFlight, clearSelectedFlight, clearFlights } =
  flightsSlice.actions;
export default flightsSlice.reducer;
