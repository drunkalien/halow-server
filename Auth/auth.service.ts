import User from "../User/user.model";
import { CreateUserDto } from "./dto/createUser.dto";
import { SignInDto } from "./dto/SignIn.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { findUserByUsername } from "../User/user.service";

export const signUp = async (payload: CreateUserDto) => {
  const user = await User.create(payload);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "100d",
  });

  return { user, token };
};

export const signIn = async (payload: SignInDto) => {
  const user = await findUserByUsername(payload.username);
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isMatch = await bcrypt.compare(payload.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "100d",
  });

  return { user, token };
};
