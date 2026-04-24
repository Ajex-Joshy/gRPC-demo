import mongoose from "mongoose";
import { ENV } from "../config/env.config";
import { DatabaseException } from "../exceptions/Database.exception";

export const connectDB = async (): Promise<void> => {
  try {
    const uri = ENV.MONGO_URI;

    if (!uri) throw new DatabaseException("Database connection failed");
    await mongoose.connect(uri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
