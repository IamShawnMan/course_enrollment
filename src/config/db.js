import { connect } from "mongoose";
import { config } from "./config.js";

export async function connectionDB() {
  try {
    await connect(config.db.url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection failed");
    process.exit(1);
  }
}
