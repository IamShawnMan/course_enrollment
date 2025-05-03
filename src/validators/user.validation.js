import Joi from "joi";

export const userValidator = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(3).max(20),
  enrolledCourses: Joi.string(),
});
