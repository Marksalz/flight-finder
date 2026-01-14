import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.PUBLIC_PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ---------- LOAD DB.JSON ----------
const db = JSON.parse(fs.readFileSync("./data/db.json", "utf-8"));
const { airports, flights } = db;

async function importData() {
  try {
    console.log("✈️ Importing airports...");

    const airportIdMap = {}; // oldId (string) -> newId (number)

    for (const airport of airports) {
      const { id: oldId, ...airportData } = airport;

      const { data, error } = await supabase
        .from("airports")
        .insert(airportData)
        .select("id")
        .single();

      if (error) throw error;

      airportIdMap[String(oldId)] = data.id;
    }

    console.log("✅ Airports imported");

    console.log("✈️ Importing flights...");

    for (const flight of flights) {
      const { id, origin, destination, ...flightData } = flight;

      const flightRow = {
        ...flightData,
        origin: airportIdMap[String(origin)],
        destination: airportIdMap[String(destination)],
      };

      const { error } = await supabase.from("flights").insert(flightRow);

      if (error) throw error;
    }

    console.log("✅ Flights imported");
    console.log("🎉 Import completed successfully");
  } catch (error) {
    console.error("❌ Import failed:", error.message);
    process.exit(1);
  }
}

importData();
