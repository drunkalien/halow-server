import { createRoom, findRoom, joinRoom } from "./Room/room.service";
import { Server } from "socket.io";
import { Peer } from "./types/PeerType";
import cors from "cors";

import express from "express";
import http from "http";

import authRoutes from "./Auth/api";
import userRoutes from "./User/api";

export const app = express();
export const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
