import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) return;
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        isConnected = true;
        console.log(`Connected To DB: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to DB: ", error);
        process.exit(1);
    }
}