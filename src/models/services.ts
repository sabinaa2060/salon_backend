import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  name: string;
  price: number;
  duration: number;
}

const serviceSchema = new Schema<IService>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;