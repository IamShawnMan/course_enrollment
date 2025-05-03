import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const jwtSecret = config.secret;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.send("Registratsiyadan o'tilmagan");
  }
  const token = authHeader.slice(7);
  try {
    const user = jwt.verify(token, jwtSecret, {
      algorithms: "HS512",
    });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Something went wrong");
    return;
  }
};
