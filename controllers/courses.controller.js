import { Course } from "../models/course.model.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json({ message: "Get all courses", courses });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    res.json({ message: "get course data", course });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const addCourse = async (req, res) => {
  try {
    const courseData = req.body;

    await Course.create(courseData, { field: ["title", "price"] });

    res.status(201).json({ message: "added course!" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
      errMessage: err.message,
      errors: err.errors,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseData = req.body;

    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    await course.update(courseData, { fields: ["title", "price", "discount"] });

    res.json({ message: "update course data" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    await course.destroy();

    res.json({ message: "deleted course!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};
