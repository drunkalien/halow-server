import { createRoom, joinRoom } from "./Room/room.service";
import { Server } from "socket.io";
import { Peer } from "./types/PeerType";

import express from "express";
import http from "http";

import authRoutes from "./Auth/api";

export const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("create-room", async (payload: Peer) => {
    const room = await createRoom(payload);
    socket.emit("create-room", room);
  });

  socket.on("join-room", async (roomId: number, peer: Peer) => {
    const room = await joinRoom(roomId, peer);
    socket.emit("join-room", room);
  });
});

app.use("/api/v1/auth", authRoutes);
