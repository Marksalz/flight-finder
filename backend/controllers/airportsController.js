import { supabaseClient } from "../data/supabase.js";

export async function getAllAirports(req, res) {
  try {
    const { data: airports, error } = await supabaseClient
      .from("airports")
      .select("*");

    if (error) {
      throw error;
    }

    res.json(airports);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function getAirportById(req, res) {
  try {
    const { airportId } = req.params;

    if (!airportId) {
      return res.status(400).json({
        success: false,
        message: "Airport ID is required",
      });
    }

    const { data: airport, error } = await supabaseClient
      .from("airports")
      .select("*")
      .eq("id", Number(airportId))
      .single();

    if (error) {
      throw error;
    }

    res.json(airport);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function createAirport(req, res) {
  try {
    const airportData = req.body;

    if (!airportData) {
      return res.status(400).json({
        success: false,
        message: "Airport data is required",
      });
    }

    const { data: newAirport, error } = await supabaseClient
      .from("airports")
      .insert([airportData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ success: true, airport: newAirport });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function modifyAirport(req, res) {
  try {
    const { airportId } = req.params;
    const airportData = req.body;

    if (!airportId || !airportData) {
      return res.status(400).json({
        success: false,
        message: "Airport ID and airport data is required",
      });
    }

    const { data: updatedAirport, error } = await supabaseClient
      .from("airports")
      .update(airportData)
      .eq("id", Number(airportId))
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ success: true, airport: updatedAirport });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function removeAirport(req, res) {
  try {
    const { airportId } = req.params;

    if (!airportId) {
      return res.status(400).json({
        success: false,
        message: "Airport ID is required",
      });
    }

    const { data: airportToDelete, error } = await supabaseClient
      .from("airports")
      .delete()
      .eq("id", Number(airportId))
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ success: true, deleted: airportToDelete });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}
