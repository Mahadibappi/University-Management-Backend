import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`server is running on ${config.port}`);
    });
  } catch (error) {
    console.log("did not connected", error);
  }
}

main();
process.on("unhandledRejection", () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
