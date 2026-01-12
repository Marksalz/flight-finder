import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { findNextId } from "../utils/helperFunctions.js";

const data = JSON.parse(
  await readFile(new URL("../data/db.json", import.meta.url))
);

const { airports } = data;

const airportRouter = Router();

airportRouter.get("/", async (req, res) => {
  try {
    res.json(airports);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

airportRouter.get("/:airportId", async (req, res) => {
  try {
    const { airportId } = req.params;
    const airport = airports.find((airport) => airport.id === airportId);

    if (!airport) {
      return res.status(404).json({
        success: false,
        message: "Airport not found",
      });
    }

    res.json(airport);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

airportRouter.post("/", async (req, res) => {
  try {
    const airportData = req.body;

    const newId = findNextId(airports);
    const newAirport = { id: newId, ...airportData };
    airports.push(newAirport);

    await writeFile(
      new URL("../data/db.json", import.meta.url),
      JSON.stringify({ ...data, airports }, null, 2)
    );
    res.status(201).json({ success: true, airport: newAirport });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

airportRouter.put("/:airportId", async (req, res) => {
  try {
    const { airportId } = req.params;
    const airportData = req.body;

    const airportIndex = airports.findIndex(
      (airport) => airport.id === airportId
    );

    if (airportIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Airport not found" });
    }

    const updatedAirport = { ...airports[airportIndex], ...airportData };
    airports[airportIndex] = updatedAirport;

    await writeFile(
      new URL("../data/db.json", import.meta.url),
      JSON.stringify({ ...data, airports }, null, 2)
    );
    res.json({ success: true, airport: updatedAirport });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

airportRouter.delete("/airportId", async (req, res) => {
  try {
    const { airportId } = req.params;

    const airportToDelete = airports.find(
      (airport) => airport.id === airportId
    );

    if (!airportToDelete) {
      return res.status(404).json({
        success: false,
        message: "Airport not found",
      });
    }

    const updatedAirports = airports.filter(
      (airport) => airport.id !== airportId
    );
    data.airports = updatedAirports;

    await writeFile(
      new URL("../data/db.json", import.meta.url),
      JSON.stringify(data, null, 2)
    );
    res.json({ success: true, deleted: airportToDelete });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
});

export default airportRouter;
