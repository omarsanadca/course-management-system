import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";

import { User } from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error("Register failed!");
      err.status = 400;
      err.errors = errors.array();
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error("Login failed!");
      err.status = 400;
      err.errors = errors.array();
      throw err;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const err = new Error("Wrong credentials");
      err.status = 400;
      throw err;
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      const err = new Error("Wrong credentials!!!!!!!!!!!");
      err.status = 400;
      throw err;
    }

    const payload = {
      userId: user.id,
      userEmail: user.email,
      role: user.role,
    };

    jwt.sign(payload, "my-secret", { expiresIn: "24h" }, (err, token) => {
      if (err) {
        next(err);
        return;
      }

      res.json({
        message: "user logged in successfully!",
        token,
      });
    });
  } catch (err) {
    next(err);
  }
};
