import express from "express";

import {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  register,
  login,
} from "../controllers/users.controller.js";

import isAuthenticated from "../middlewares/is-authenticated.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/me", isAuthenticated, getUser);

// router.post("/", addUser);

router.post("/register", register);

router.post("/login", login);

router.patch("/me", isAuthenticated, updateUser);

router.delete("/:id", deleteUser);

export default router;
