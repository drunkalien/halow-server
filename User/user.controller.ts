import { Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { verifyToken } from "../utils/verifyToken";

import { findUser, findUserByUsername, updateUser } from "./user.service";

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await findUser(id);

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

export const getUserByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(username);

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

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const user = updateUser(req.params.id, req.body);

    res.json({
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

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    const user = await verifyToken(token);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found!",
      });

      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error: any) {
    const resError = ErrorHandler.sendErrorMessage(error);

    res.status(resError.status).json({
      resError,
    });
  }
};
