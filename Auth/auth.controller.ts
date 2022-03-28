import { Request, Response } from "express";

import { signIn as loginUser, signUp as createUser } from "./auth.service";

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
