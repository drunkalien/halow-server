import { Router } from "express";

import { getUser, getUserByUsername, updateUserById } from "./user.controller";

const router = Router();

router.route("/username/:username").get(getUser);
router.route("/id/:username").get(getUserByUsername);
router.route("/:id").patch(updateUserById);

export default router;
