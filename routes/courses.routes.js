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

/* Needs protection, (ADMIN) */
router.post("/", isAuthenticated, isAdmin, addCourse);

/* Needs protection, (ADMIN) */
router.patch("/:id", isAuthenticated, isAdmin, updateCourse);

/* Needs protection, (ADMIN) */
router.delete("/:id", isAuthenticated, isAdmin, deleteCourse);

export default router;
