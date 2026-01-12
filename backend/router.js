import { Router } from "express";
import airportRouter from "./routes/airportRoutes.js";
import flightRouter from "./routes/flightRoutes.js";

const router = Router();

router.use("/airports", airportRouter);
router.use("/flights", flightRouter);

export default router;
