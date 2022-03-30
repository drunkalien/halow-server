import { NextFunction, Request, Response } from "express";

import { signIn as loginUser, signUp as createUser } from "./auth.service";
import { verifyToken } from "../utils/verifyToken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    let token;

    if (header && header?.startsWith("Bearer")) {
      token = header.split("")[1];
    }

    await verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error,
    });
  }
};
