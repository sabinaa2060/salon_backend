import express from "express";
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointment.controllers";

const router = express.Router();

router.get("/", getAppointments);
router.post("/", createAppointment);
router.patch("/:id/status", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;