import { Request, Response } from "express";
import Service from "../models/services";

// GET /api/services
export const getServices = async (
  req: Request,
  res: Response
) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch services",
    });
  }
};

// POST /api/services
export const createService = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, price, duration } = req.body;

    if (!name || price === undefined || duration === undefined) {
      return res.status(400).json({
        message: "Name, price and duration are required",
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (Number(duration) <= 0) {
      return res.status(400).json({
        message: "Duration must be greater than 0",
      });
    }

    const service = await Service.create({
      name,
      price,
      duration,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create service",
    });
  }
};

// PUT /api/services/:id
export const updateService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, price, duration } = req.body;

    if (!name || price === undefined || duration === undefined) {
      return res.status(400).json({
        message: "Name, price and duration are required",
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (Number(duration) <= 0) {
      return res.status(400).json({
        message: "Duration must be greater than 0",
      });
    }

    const service = await Service.findByIdAndUpdate(
      id,
      {
        name,
        price,
        duration,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update service",
    });
  }
};

// DELETE /api/services/:id
export const deleteService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete service",
    });
  }
};