import { body } from "express-validator";

// import { User } from "../models/user.model.js";
import User from "../models/user.model.js";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (email) => {
      const findUser = await User.findOne({
        email,
      });
      if (findUser) {
        throw new Error("This email is already used! (express-validator)");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 8, max: 30 })
    .withMessage(
      "Password length must be at least 8 and at most 30 characters."
    ),
  body("confirmPassword").custom((val, { req }) => {
    const password = req.body.password;
    if (password !== val) {
      throw new Error("Passwords don't match!");
    }
    return true;
  }),
  body("name")
    .notEmpty()
    .withMessage("name must not be empty!")
    .if(body("role").equals("admin"))
    .custom((val) => {
      if (!val.startsWith("a_")) {
        throw new Error("admin names must start with `a_`");
      }
      return true;
    }),
  body("role")
    .optional()
    .custom((val) => {
      if (val !== "admin" && val !== "student") {
        throw new Error("role must be either 'admin' or 'student'.");
      }
      return true;
    }),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Not a valid email"),
];
