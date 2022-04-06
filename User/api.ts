import { Router } from "express";

import {
  getUser,
  getUserByUsername,
  updateUserById,
  getCurrentUser,
} from "./user.controller";

const router = Router();

router.route("/username/:username").get(getUser);
router.route("/id/:id").get(getUserByUsername);
router.route("/:id").patch(updateUserById);
router.route("/current").get(getCurrentUser);

export default router;
