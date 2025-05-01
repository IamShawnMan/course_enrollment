import express from "express";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .get("/", authMiddleware, userController.allUsers)
  .post("/register", userController.register)
  .post("/login", userController.login);

export default router;
