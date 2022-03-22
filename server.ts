import { app } from "./app";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect("mongodb://localhost/halow")
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err: any) => {
    console.log(err);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("app is running on port 5000");
});
