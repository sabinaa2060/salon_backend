import mongoose, { Document, Schema } from "mongoose";

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export interface IAppointment extends Document {
  customerName: string;
  customerPhone: string;
  service: mongoose.Types.ObjectId;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: AppointmentStatus;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    appointmentDate: {
      type: String,
      required: true,
    },

    appointmentTime: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema
);

export default Appointment;