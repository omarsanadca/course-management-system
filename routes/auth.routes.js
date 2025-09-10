import express from "express";

const router = express.Router();

import { register, login } from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validators.js";

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

export default router;
