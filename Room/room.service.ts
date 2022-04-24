import { Peer } from "../types/PeerType";
import Room from "./room.model";

export const createRoom = async ({
  host,
  peer,
}: {
  host: string;
  peer?: Peer;
}) => {
  const MIN = 100000;
  const MAX = 999999;
  const roomId = Math.abs(Math.trunc(Math.random() * (MAX - MIN) - MIN));
  const room = await Room.create({ roomId, peers: [] });

  return room;
};

export const joinRoom = async (roomId: number, peer: Peer) => {
  const room = await Room.findOne({ roomId });
  if (!room) {
    console.log(roomId);
    return false;
  }

  room.peers.push(peer);
  await room.save();
  return room;
};

export const findRoom = async (roomId: number) => {
  const room = await Room.findOne({ roomId });

  return room;
};
