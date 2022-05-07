import { Router } from "express";

import { signUp, signIn } from "./auth.controller";

const router = Router();

router.route("/signup").post(signUp);
router.route("/login").post(signIn);

export default router;
