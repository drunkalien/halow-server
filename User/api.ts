import { Router } from "express";

import { getUser, getUserByUsername } from "./user.controller";

const router = Router();

router.route("/username/:username").get(getUser);
router.route("/id/:username").get(getUser);

export default router;
