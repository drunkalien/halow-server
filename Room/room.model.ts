import { Schema, model, Document } from "mongoose";
import { Peer } from "../types/PeerType";

export interface IRoom extends Document {
  host: string;
  roomId: number;
  peers: Peer[];
}

const RoomSchema = new Schema<IRoom>({
  roomId: {
    type: Number,
    required: true,
  },
  peers: Array,
});

export default model("Room", RoomSchema);
