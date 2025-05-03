import express from "express";

import courseRouter from "./routes/courseRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
