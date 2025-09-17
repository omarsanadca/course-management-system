// import { User } from "../models/user.model.js";
// import { Course } from "../models/course.model.js";

import userModel from "../models/user.model.js";
import courseModel from "../models/course.model.js";
import CourseEnrollmentModel from "../models/CourseEnrollment.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .where("role").ne("admin")
      .select("-password -profile");
    res.json({ message: "Get all users", users });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id || req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    res.json({ message: "get user data", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userData = req.body;

    console.log(userData);

    // const user = await userModel.findById(req.userId);

    // if (!user) {
    //   return res.status(404).json({ message: "user not found!" });
    // }

    // await user.updateOne(userData);

    const result = await userModel.findOneAndUpdate(
      { _id: req.userId },
      { $set: userData }
    );

    console.log(result);

    res.json({ message: "User updated!" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await userModel.findOneAndDelete({ _id: req.userId });

    res.json({ message: "deleted user!" });
  } catch (err) {
    next(err);
  }
};

export const getEnrolledCourses = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      const err = new Error("User was deleted!");
      err.status = 400;
      throw err;
    }

    // const courses = await user.getCourses();

    const courses = await CourseEnrollmentModel.find({
      student: userId,
    })
      .select("-student -_id")
      .populate("course");

    res.json({ message: "Fetched your courses", courses });
  } catch (err) {
    next(err);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      const err = new Error("User was deleted!");
      err.status = 400;
      throw err;
    }

    const courseId = req.body.courseId;

    const course = await courseModel.findById(courseId);

    if (!course) {
      const err = new Error("Course NOT FOUND");
      err.status = 404;
      throw err;
    }

    // const result = await user.addCourse(course);

    await CourseEnrollmentModel.create({ student: user, course });

    res.json({ message: "User enrolled in the course!", course });
  } catch (err) {
    next(err);
  }
};
