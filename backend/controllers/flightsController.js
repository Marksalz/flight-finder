import { supabaseClient } from "../data/supabase.js";

export async function getFlightsByQuery(req, res) {
  try {
    const { origin, destination, date, start_date, end_date } = req.query;

    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        message: "Origin and destination are required",
      });
    }

    let query = supabaseClient
      .from("flights")
      .select("*")
      .eq("origin", Number(origin))
      .eq("destination", Number(destination));

    if (date) {
      query = query.eq("date", date); // exact match
    } else if (start_date && end_date) {
      query = query.gte("date", start_date).lte("date", end_date); // range
    }

    const { data: flights, error } = await query;

    if (error) {
      throw error;
    }

    res.json(flights);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function getFlightById(req, res) {
  try {
    const { flightId } = req.params;

    if (!flightId) {
      return res.status(400).json({
        success: false,
        message: "Flight ID is required",
      });
    }

    // Fetch flight from Supabase
    const { data: flight, error } = await supabaseClient
      .from("flights")
      .select("*")
      .eq("id", Number(flightId))
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          message: "Flight not found",
        });
      }
      throw error;
    }

    res.json({
      success: true,
      data: flight,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function createFlight(req, res) {
  try {
    const flightData = req.body;

    if (!flightData) {
      return res.status(400).json({
        success: false,
        message: "Flight data is required",
      });
    }

    const { data: createdFlight, error } = await supabaseClient
      .from("flights")
      .insert([flightData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({ success: true, flight: createdFlight });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function modifyFlight(req, res) {
  try {
    const { flightId } = req.params;
    const flightData = req.body;

    if (!flightData || !flightId) {
      return res.status(400).json({
        success: false,
        message: "Updated flight data and Id is required",
      });
    }

    const { data: updatedFlight, error } = await supabaseClient
      .from("flights")
      .update(flightData)
      .eq("id", Number(flightId))
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json(updatedFlight);
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}

export async function removeFlight(req, res) {
  try {
    const { flightId } = req.params;

    if (!flightId) {
      return res.status(400).json({
        success: false,
        message: "flight Id is required",
      });
    }

    const { data: flightToDelete, error } = await supabaseClient
      .from("flights")
      .delete()
      .eq("id", Number(flightId))
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json({ success: true, deleted: flightToDelete });
  } catch (error) {
    res.status(500).json({
      success: false,
      details: error.message,
    });
  }
}
