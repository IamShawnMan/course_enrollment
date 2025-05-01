import app from "./app.js";

import { config } from "./config/config.js";
import { connectionDB } from "./config/db.js";

const PORT = config.api.port;
const start = () => {
  try {
    connectionDB();
    app.listen(PORT, () => {
      console.log(`Server satrted on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error.message);
    process.exit(1);
  }
};

start();
