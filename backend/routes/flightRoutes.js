import { Router } from "express";

import {
  createFlight,
  getFlightById,
  getFlightsByQuery,
  modifyFlight,
  removeFlight,
} from "../controllers/flightsController.js";

const flightRouter = Router();

flightRouter.get("/", getFlightsByQuery);

flightRouter.get("/:flightId", getFlightById);

flightRouter.post("/", createFlight);

flightRouter.put("/:flightId", modifyFlight);

flightRouter.delete("/:flightId", removeFlight);

export default flightRouter;

//  async (req, res) => {
//   try {
//     const { origin, destination, date, start_date, end_date } = req.query;
//     const data = JSON.parse(
//       await readFile(new URL("../data/db.json", import.meta.url))
//     );
//     const { flights } = data;
//     let filteredFlights;

//     if (date) {
//       filteredFlights = flights.filter((flight) => {
//         const flightDate = flight.date.slice(0, 10);
//         return (
//           flight.origin === Number(origin) &&
//           flight.destination === Number(destination) &&
//           flightDate === date
//         );
//       });
//     } else {
//       filteredFlights = flights.filter((flight) => {
//         const flightDate = flight.date.slice(0, 10);

//         return (
//           flight.origin === Number(origin) &&
//           flight.destination === Number(destination) &&
//           flightDate >= start_date &&
//           flightDate <= end_date
//         );
//       });
//     }
//     res.json(filteredFlights);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       details: error.message,
//     });
//   }
// }

// async (req, res) => {
//   try {
//     const data = JSON.parse(
//       await readFile(new URL("../data/db.json", import.meta.url))
//     );
//     const { flights } = data;

//     const { flightId } = req.params;

//     const flight = flights.find((flight) => flight.id === flightId);

//     if (!flight) {
//       return res.status(404).json({
//         success: false,
//         message: "Flight not found",
//       });
//     }

//     res.json(flight);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       details: error.message,
//     });
//   }
// }

// async (req, res) => {
//   try {
//     const data = JSON.parse(
//       await readFile(new URL("../data/db.json", import.meta.url))
//     );
//     const { flights } = data;

//     const flightData = req.body;

//     const newId = findNextId(flights);
//     const newFlight = { id: newId, ...flightData };
//     flights.push(newFlight);

//     await writeFile(
//       new URL("../data/db.json", import.meta.url),
//       JSON.stringify({ ...data, flights }, null, 2)
//     );
//     res.status(201).json({ success: true, flight: newFlight });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       details: error.message,
//     });
//   }
// }

// async (req, res) => {
//   try {
//     const data = JSON.parse(
//       await readFile(new URL("../data/db.json", import.meta.url))
//     );
//     const { flights } = data;

//     const { flightId } = req.params;
//     const flightData = req.body;

//     const flightIndex = flights.findIndex((flight) => flight.id === flightId);

//     if (flightIndex === -1) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Flight not found" });
//     }

//     const updatedFlight = { ...flights[flightIndex], ...flightData };
//     flights[flightIndex] = updatedFlight;

//     await writeFile(
//       new URL("../data/db.json", import.meta.url),
//       JSON.stringify({ ...data, flights }, null, 2)
//     );
//     res.json(updatedFlight);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       details: error.message,
//     });
//   }
// }

// async (req, res) => {
//   try {
//     const data = JSON.parse(
//       await readFile(new URL("../data/db.json", import.meta.url))
//     );
//     const { flights } = data;

//     const { flightId } = req.params;

//     const flightToDelete = flights.find((flight) => flight.id === flightId);

//     if (!flightToDelete) {
//       return res.status(404).json({
//         success: false,
//         message: "Flight not found",
//       });
//     }

//     const updatedFlights = flights.filter((flight) => flight.id !== flightId);
//     data.flights = updatedFlights;

//     await writeFile(
//       new URL("../data/db.json", import.meta.url),
//       JSON.stringify(data, null, 2)
//     );
//     res.json({ success: true, deleted: flightToDelete });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       details: error.message,
//     });
//   }
// }
