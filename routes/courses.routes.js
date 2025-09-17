import express from "express";
import { param } from "express-validator";

import { getAllCourses, getCourse } from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get(
  "/:id",
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("course id must be 24 characters!"),
  ],
  getCourse
);

export default router;
