import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { collections } from "../config/collections.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    enrolledCourses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = this.password;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password, user) {
  try {
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export const User = mongoose.model(collections.user, userSchema);
