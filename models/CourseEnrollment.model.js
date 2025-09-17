import { Schema, model } from "mongoose";

const courseEnrollmentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
});

courseEnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default model("courseEnrollment", courseEnrollmentSchema);
