import { io } from "socket.io-client";
import { config } from "dotenv";
config();

// Use the SERVER environment variable if it exists, otherwise use localhost:5000
const URL = process.env.SERVER || "http://localhost:5000";

export const socket = io(URL, {
    autoConnect: false
  });
