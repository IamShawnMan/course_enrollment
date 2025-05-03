import express from "express";
import { courseController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.guard.js";

const router = express.Router();

router
  .post("/", authMiddleware, courseController.create)
  .get("/", authMiddleware, courseController.get);

export default router;
