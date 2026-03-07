import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/varan-colleges";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Important to prevent buffering timeout errors
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
      cached.conn = await cached.promise;
      return cached.conn;
  } catch (error) {
      console.warn("MongoDB connection error:", error);
      return null;
  }
}

export default connectToDatabase;
