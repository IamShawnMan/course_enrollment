import logger from "./logger/logger.js";
export const errorHandler = (err, _, res, _) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  logger.error(`Error ${err}`);
  res.status(statusCode).json({
    status: "error",
    message,
    stack: err.stack,
  });
};

export class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    Error.captureStackTrace(this);
  }
}
