import express from "express";

import {
  getProfile,
  fillProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", getProfile);

router.post("/", fillProfile);

router.patch("/", updateProfile);

export default router;
