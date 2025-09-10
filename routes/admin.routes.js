import express from "express";
import { body } from "express-validator";

import {
  addCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courses.controller.js";

import { getAllUsers, getUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post(
  "/courses",
  [
    body("title")
      .trim()
      .isLength({ min: 5 })
      .withMessage("course title must be at least 5 characters."),
    body("price")
      .toFloat()
      .isFloat()
      .withMessage("invalid price value")
      .custom((val) => {
        if (val < 0) {
          throw new Error("Price can't be negative");
        }
        return true;
      }),
    body("discount")
      .optional()
      .custom((val) => {
        console.log(val);
        
        if (val < 0 || val > 100) {
          throw new Error("discount must be between 0 and 100");
        }
        return true;
      }),
  ],
  addCourse
);

router.patch("/courses/:id", updateCourse);

router.delete("/courses/:id", deleteCourse);

router.get("/users", getAllUsers);

router.get("/users/:id", getUser);

export default router;
