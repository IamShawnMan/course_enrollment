import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  teacher: {
    type: String,
    trim: true,
    required: true,
  },
});

export const Course = mongoose.model("Course", courseSchema);
