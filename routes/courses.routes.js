import express from "express";
import { param } from "express-validator";

import { getAllCourses, getCourse } from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", getAllCourses);

router.get(
  "/:id",
  [param("id").isNumeric().withMessage("course id must be numeric!")],
  getCourse
);

export default router;
