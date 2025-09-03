import express from "express";

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getEnrolledCourses,
  enrollCourse,
} from "../controllers/users.controller.js";

import isAdmin from "../middlewares/is-admin.js";

const router = express.Router();

router.get("/me", getUser);

router.patch("/me", updateUser);

router.delete("/me", deleteUser);

router.get("/enrolled-courses", getEnrolledCourses);

router.post("/enroll", enrollCourse);

export default router;
