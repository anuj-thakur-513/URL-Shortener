import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import { DB_NAME } from "../constants.js";

const connectDb = asyncHandler(async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGO_URI}/${DB_NAME}`
  );
  console.log(
    "MongoDB connected on host: ",
    connectionInstance.connection.host
  );
});

export default connectDb;
