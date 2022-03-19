import { app } from "./app";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/halow")
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err: any) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
