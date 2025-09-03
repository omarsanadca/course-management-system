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
    const courseData = req.body;

    await Course.create(courseData, { field: ["title", "price"] });

    res.status(201).json({ message: "added course!" });
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
