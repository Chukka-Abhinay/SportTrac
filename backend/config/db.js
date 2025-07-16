import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI||"mongodb://localhost:27017/SportsTrac-my");
    console.log(`Successfully connected to the mongoDB`);
  } catch (error) {
    console.error(`Error in connecting Database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
