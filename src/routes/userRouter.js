import express from "express";
import { userController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/auth.guard.js";
import { userGuard } from "../middlewares/role.guard.js";
import { selfGuard } from "../middlewares/self.guard.js";

const router = express.Router();
router
  .get(
    "/",
    authMiddleware,
    userGuard("admin", "superadmin"),
    userController.allUsers
  )
  .post("/register", userController.register)
  .post("/login", userController.login)
  .get("/:id", authMiddleware, selfGuard, userController.getById)
  .get("/me/courses", authMiddleware, selfGuard, userController.getMyCourses);

export default router;
