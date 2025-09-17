import { Schema, model } from "mongoose";

const lectureSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
});

export default model("Lecture", lectureSchema);
