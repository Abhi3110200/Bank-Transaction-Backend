import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
   mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      console.log("MongoDB connected");
   })
   .catch(err =>{
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
   })
};

export default connectDB;