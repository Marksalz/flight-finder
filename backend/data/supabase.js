import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

export const supabaseClient = createClient(
  process.env.PUBLIC_PROJECT_URL,
  process.env.PUBLIC_ANON_API_KEY
);

export async function connectToSupabase() {
  try {
    const { error } = await supabaseClient
      .from("flights")
      .select("id", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    console.log("Connected to Supabase");
  } catch (error) {
    console.error("Supabase connection error:", error.message);
    throw error;
  }
}
