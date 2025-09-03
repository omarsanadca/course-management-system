import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      const err = new Error("UnAuthorized!");
      err.status = 401;
      return next(err);
    }

    jwt.verify(token, "my-secret", (err, payload) => {
      if (err) {
        return next(err);
      }

      req.userId = payload.userId;
      req.role = payload.role;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;
