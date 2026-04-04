import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/varan-colleges";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // If we have a connection, check if it is still valid
  if (cached.conn) {
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    } else {
      // Connection exists but is not ready. Clear the promise to force reconnect.
      cached.promise = null;
    }
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
      // Clear the cached promise so the next request can attempt to reconnect
      cached.promise = null;
      throw error; // Throw the error so the caller knows the connection failed, rather than returning null
  }
}

export default connectToDatabase;
