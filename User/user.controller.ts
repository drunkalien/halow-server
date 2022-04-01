import { Request, Response } from "express";

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
