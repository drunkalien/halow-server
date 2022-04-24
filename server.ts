import { createRoom, findRoom, joinRoom } from "./Room/room.service";
import { Server } from "socket.io";
import { Peer } from "./types/PeerType";
import { app } from "./app";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket: any) => {
  socket.on("create-room", async (username: string) => {
    const room = await createRoom({ host: username });
    socket.emit("create-room", room.roomId);
  });

  socket.on(
    "join-room",
    async ({ roomId, peer }: { roomId: number; peer: Peer }) => {
      const room = await joinRoom(roomId, peer);
      socket.emit("join-room", room);
    }
  );

  socket.on("get-all-users", async (roomId: number) => {
    const room = await findRoom(roomId);

    if (!room) {
      console.log(roomId);
      socket.emit("invalid-room-id");
      return;
    }

    socket.emit("get-all-users", room.peers);
  });

  socket.on("sending-signal", (payload: any) => {
    io.to(payload.userToSignal).emit("user-joined", {
      signal: payload.signal,
      callerId: payload.callerId,
    });
  });

  socket.on("returning-signal", (payload: any) => {
    io.to(payload.callerId).emit("receiving-returned-signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on(
    "leave-room",
    async (payload: { roomId: number; peerId: string }) => {
      const room = await findRoom(payload.roomId);
      // @ts-ignore
      room.peers = room?.peers.filter((peer) => payload.peerId != peer.peerId);
      socket.emit("user-left", { peerId: payload.peerId });
    }
  );
});

const DB = process.env.DB_URL || "mongodb://localhost/halow";

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err: any) => {
    console.log(err);
  });
