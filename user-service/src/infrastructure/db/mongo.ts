import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri)
      throw new Error("MONGO_URI is not defined in environment variables");

    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
