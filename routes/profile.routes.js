import express from "express";

import {
  getProfile,
  fillProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/:userId", getProfile);

router.post("/:userId", fillProfile);

router.patch("/:userId", updateProfile);

export default router;
