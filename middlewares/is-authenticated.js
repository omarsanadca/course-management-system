import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      const err = new Error("UnAuthorized!");
      err.status = 401;
      next(err);
    }

    /* Sync */
    const payload = jwt.verify(token, "my-secret");

    req.userId = payload.userId;

    next();
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;
