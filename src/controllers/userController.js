import { config } from "../config/config.js";
import { generateToken } from "../library/generateToken.js";
import { User } from "../models/index.js";
import { appError } from "../utils/errorHandler.js";
import { encode, decode } from "../utils/encode-decode.js";
import { userValidator } from "../validators/user.validation.js";

export const userController = {
  register: async (req, res, next) => {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        throw new appError("Validation error");
      }
      const user = await User.findOne(
        {
          email: value.email,
        },
        "email _id"
      ).exec();
      if (user) {
        throw new appError("User with this email already exist", 400);
      }

      const { password } = value;
      const hashedPassword = await encode(password);
      const newUser = new User({
        ...value,
        password: hashedPassword,
      });

      await newUser.save();

      res.json({
        status: "success",
        message: "New user created",
        error: null,
        data: {
          newUser,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email,
      });
      if (!user) {
        throw new appError("User not found", 404);
      }
      const validPassword = await decode(password, user.password);

      if (!validPassword) {
        res.status(401).send("User detail wrong");
        return;
      }

      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };
      const jwtSecret = config.secret;

      const token = await generateToken(payload, jwtSecret, {
        algorithm: "HS512",
        expiresIn: "1d",
      });
      res.json({
        status: "success",
        message: "Logged in",
        error: null,
        data: {
          user: {
            ...payload,
          },
          jwt: {
            token,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },

  allUsers: async (_, res, next) => {
    try {
      const allUsers = await User.find({})
        .populate("enrolledCourses", "title description")
        .exec();

      res.json({
        status: "success",
        message: "All students",
        error: null,
        data: {
          allUsers,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id, "_id email name enrolledCourses")
        .populate("courses")
        .exec();

      if (!user) {
        throw new appError("User not found");
      }
      res.json({
        status: "success",
        message: "User by id",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  getMyCourses: async (req, res, next) => {
    try {
      const { id } = req.user;
      const me = await User.findById(id, "_id email name enrolledCourses")
        .populate("courses")
        .exec();
      if (!me) {
        throw new appError("Error on getting users data", 404);
      }
      res.json({
        status: "success",
        message: "My details",
        data: me,
      });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};
