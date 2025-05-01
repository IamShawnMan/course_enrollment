import { Course } from "../models/index.js";

export const courseController = {
  create: async (req, res, next) => {
    try {
      const course = new Course(req.body);
      await course.save();

      res.json({
        status: "success",
        message: "New course added",
        error: null,
        data: {
          course,
        },
      });
    } catch (error) {}
  },
  get: async (req, res, next) => {
    const allCourse = await Course.find();

    res.json({
      status: "success",
      message: "All courses",
      error: null,
      data: {
        allCourse,
      },
    });
  },
};
