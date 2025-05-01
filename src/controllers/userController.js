import { config } from "../config/config.js";
import { generateToken } from "../library/generateToken.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

export const userController = {
  register: async (req, res, next) => {
    try {
      const data = req.body;
      const user = await User.findOne(
        {
          email: data.email,
        },
        "email _id"
      ).exec();
      if (!user) {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          ...req.body,
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
      }

      res.json({
        status: "fail",
        message: "User with this email is already exist",
        error: "User already exist",
        data: {
          user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        res.send("User not found");
        return;
      }
      const validPassword = await user.isValidPassword(password, user);

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
    } catch (error) {}
  },
  allUsers: async (req, res, next) => {
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
      console.log(error);
    }
  },
};
