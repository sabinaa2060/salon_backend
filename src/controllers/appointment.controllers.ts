import { Request, Response } from "express";
import mongoose from "mongoose";
import Appointment from "../models/appointment";
import Service from "../models/services";

// GET /api/appointments
export const getAppointments = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.query;

    const filter: any = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate("service", "name price duration")
      .sort({
        appointmentDate: 1,
        appointmentTime: 1,
      });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch appointments",
    });
  }
};

// POST /api/appointments
export const createAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      customerName,
      customerPhone,
      service,
      appointmentDate,
      appointmentTime,
      notes,
    } = req.body;

    // Required field validation
    if (
      !customerName ||
      !customerPhone ||
      !service ||
      !appointmentDate ||
      !appointmentTime
    ) {
      return res.status(400).json({
        message:
          "Customer name, phone, service, date and time are required",
      });
    }

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(service)) {
      return res.status(400).json({
        message: "Invalid service ID",
      });
    }

    // Check service exists
    const existingService = await Service.findById(service);

    if (!existingService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Check double booking
    const existingAppointment = await Appointment.findOne({
      service,
      appointmentDate,
      appointmentTime,
    });

    if (existingAppointment) {
      return res.status(409).json({
        message:
          "This service is already booked at this date and time",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      customerName,
      customerPhone,
      service,
      appointmentDate,
      appointmentTime,
      notes,
      status: "Pending",
    });

    // Return appointment with service information
    const populatedAppointment = await appointment.populate(
      "service",
      "name price duration"
    );

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: populatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment",
    });
  }
};

// PATCH /api/appointments/:id/status
export const updateAppointmentStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate("service", "name price duration");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update appointment status",
    });
  }
};

// DELETE /api/appointments/:id
export const deleteAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete appointment",
    });
  }
};