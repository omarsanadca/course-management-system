import express from "express";

import {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";

import isAuthenticated from "../middlewares/is-authenticated.js";
import isAdmin from "../middlewares/is-admin.js";

const router = express.Router();

/* No protection */
router.get("/", getAllCourses);

/* No protection */
router.get("/:id", getCourse);

export default router;
