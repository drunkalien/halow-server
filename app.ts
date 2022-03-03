import { Socket } from "socket.io";
import { createRoom, joinRoom } from "./Room/room.service";
import { Peer } from "./types/PeerType";

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
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
