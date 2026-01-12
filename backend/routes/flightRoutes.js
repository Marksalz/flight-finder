import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const data = JSON.parse(
  await readFile(new URL("../data/db.json", import.meta.url))
);

const { flights } = data;

const flightRouter = Router();

flightRouter.get("/", async (req, res) => {
  try {
    const { origin, destination, date, start_date, end_date } = req.query;
    let filteredFlights;

    if (date) {
      filteredFlights = flights.filter((flight) => {
        const flightDate = flight.date.slice(0, 10);
        return (
          flight.origin === Number(origin) &&
          flight.destination === Number(destination) &&
          flightDate === date
        );
      });
    } else {
      filteredFlights = flights.filter((flight) => {
        const flightDate = flight.date.slice(0, 10);

        return (
          flight.origin === Number(origin) &&
          flight.destination === Number(destination) &&
          flightDate >= start_date &&
          flightDate <= end_date
        );
      });
    }
    res.json({ success: true, flights: filteredFlights });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

export default flightRouter;
