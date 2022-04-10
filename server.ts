import { createRoom, findRoom, joinRoom } from "./Room/room.service";
import { Server } from "socket.io";
import { Peer } from "./types/PeerType";
import { app, server } from "./app";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

io.listen(5001);

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
      throw new Error("Invalid room id");
    }

    socket.emit("get-all-users", room.peers);
  });

  socket.on("sending-signal", (payload: any) => {
    io.to(payload.userToSignal).emit("user-joined", {
      signal: payload.signal,
      callerId: payload.callerId,
    });
  });
});

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
  console.log("app is running on port", PORT);
});
