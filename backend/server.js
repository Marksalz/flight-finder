import express from "express";
import cors from "cors";
import router from "./router.js";
import { connectToSupabase } from "./data/supabase.js";

const PORT = 3030;

const server = express();

server.use(express.json());
server.use(cors());
server.use("/api", router);

connectToSupabase();

server.listen(PORT, async () => {
  console.log(`server running on http://localhost:${PORT}`);
});
