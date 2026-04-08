import mongoose from "mongoose";
import dotenv from "dotenv/config";

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
