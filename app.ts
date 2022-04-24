import cors from "cors";

import express from "express";

import authRoutes from "./Auth/api";
import userRoutes from "./User/api";

export const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
