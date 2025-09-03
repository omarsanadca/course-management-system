import express from "express";

import {
  addCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courses.controller.js";

import { getAllUsers, getUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/courses", addCourse);

router.patch("/courses/:id", updateCourse);

router.delete("/courses/:id", deleteCourse);

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

export default router;
