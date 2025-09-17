import express from "express";

import lectureModel from "../models/lecture.model.js";

const router = express.Router();

router.get("/:courseId/lectures/", async (req, res, err) => {
  try {
    const { courseId } = req.params;

    const lectures = await lectureModel
      .find({ course: courseId })
      .select("-course");
    res.json({ message: "Get lectures", lectures });
  } catch (err) {
    next(err);
  }
});

router.get("/:courseId/lectures/:lectureId", async (req, res, err) => {
  try {
    const { courseId } = req.params;

    const lecture = await lectureModel
      .findById(req.params.lectureId)
      .populate("course", "-price -discount");
    res.json({
      message: "Get single lecture",
      lecture: { ...lecture._doc, courseId: courseId },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:courseId/lectures/", async (req, res, err) => {
  try {
    const { courseId } = req.params;

    const { title } = req.body;
    await lectureModel.create({ title, course: courseId });
    res.json({ message: "added lecture" });
  } catch (err) {
    next(err);
  }
});

router.patch("/:courseId/lectures/:lectureId", async (req, res, err) => {
  try {
    const { lectureId } = req.params;
    const { title } = req.body;

    const lecture = await lectureModel.findById(lectureId);
    lecture.title = title;
    await lecture.save();

    res.json({ message: "update single lecture" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:courseId/lectures/:lectureId", async (req, res, err) => {
  try {
    const { lectureId } = req.params;
    await lectureModel.findOneAndDelete({ _id: lectureId });
    res.json({ message: "delete single lecture" });
  } catch (err) {
    next(err);
  }
});

export default router;
