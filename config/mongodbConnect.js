import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    conn && console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
