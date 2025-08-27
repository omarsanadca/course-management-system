import express from "express";

import {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.post("/", addUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
