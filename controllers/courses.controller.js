import { matchedData, validationResult } from "express-validator";
import { Course } from "../models/course.model.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.json({ message: "Get all courses", courses });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error("Failed to fetch course data!");
      err.status = 400;
      err.errors = errors.array();
      throw err;
    }

    const course = await Course.findByPk(req.params.id);

    if (!course) {
      const err = new Error("course not found!");
      err.status = 404;
      throw err;
    }

    res.json({ message: "get course data", course });
  } catch (err) {
    next(err);
  }
};

export const addCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error("Failed to add course!");
      err.status = 400;
      err.errors = errors.array();
      throw err;
    }

    const courseData = matchedData(req);

    const course = await Course.create(courseData);

    res.status(201).json({ message: "added course!", course });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const courseData = req.body;

    const course = await Course.findByPk(req.params.id);

    if (!course) {
      const err = new Error("course not found!");
      err.status = 404;
      throw err;
    }

    await course.update(courseData, { fields: ["title", "price", "discount"] });

    res.json({ message: "update course data" });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      const err = new Error("course not found!");
      err.status = 404;
      throw err;
    }
    await course.destroy();

    res.json({ message: "deleted course!" });
  } catch (err) {
    next(err);
  }
};
