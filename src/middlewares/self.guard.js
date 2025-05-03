import { appError } from "../utils/errorHandler";

export const selfGuard = (req, _, next) => {
  try {
    const { id } = req.params;
    const role = req.user.role;
    if (role === "superadmin" || role === "admin" || req.user.id == id) {
      return next();
    }
    throw new appError("Forbidden", 400);
  } catch (error) {
    next(error);
  }
};
