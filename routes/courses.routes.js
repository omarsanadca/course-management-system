import express from "express";

import {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get("/:id", getCourse);

router.post("/", addCourse);

router.patch("/:id", updateCourse);

router.delete("/:id", deleteCourse);

export default router;
