import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//
const URL = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
