import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sabeenapandey8_db_user:dsq4ZsvE65dh3lfD@cluster0.jmxd5br.mongodb.net/?appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};

export default connectDB;