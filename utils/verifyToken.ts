import jwt from "jsonwebtoken";
import { findUser } from "../User/user.service";

export async function verifyToken(token: string | undefined) {
  if (!token) {
    throw new Error("Unauthorized");
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    throw new Error("Unauthorized");
  }

  const user = await findUser(decoded.id);

  return user;
}
