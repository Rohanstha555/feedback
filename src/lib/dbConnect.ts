import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

// ✅ attach to global so it survives across requests
const connection: ConnectionObject = (global as any)._mongoConnection || {};
(global as any)._mongoConnection = connection;

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.error("Failed to connect", error);
    process.exit(1);
  }
}

export default dbConnect;