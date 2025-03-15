import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "/.env" });
console.log("PORT from .env:", process.env.PORT);


app.listen(process.env.PORT || 8089, () => {
    console.log("App is running on port:", process.env.PORT || 8089);
  });