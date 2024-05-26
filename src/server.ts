import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

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
