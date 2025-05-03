import { appError } from "../utils/errorHandler";

export const userGuard = (...users) => {
  return (req, _, next) => {
    try {
      const { role } = req.user;
      if (users.length === 0) {
        throw new appError("Users list is  empyt", 400);
      }
      if (!users.includes(role)) {
        throw new appError("Forbidden", 400);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
