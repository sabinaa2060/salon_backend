import express from "express";
import serviceRoutes from "./routes/routes.serviceRoute";
import appointmentRoutes from "./routes/routes.appointmentRoutes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);

export default app;