import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ message: "Get all users", users });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    res.json({ message: "get user data", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const addUser = async (req, res) => {
  try {
    const userData = req.body;

    await User.create(userData, { fields: ["name", "email"] });
    res.status(201).json({ message: "added user!" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
      errMessage: err.message,
      errors: err.errors,
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userData = req.body;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    await user.update(userData, { fields: ["name", "email"] });

    res.json({ message: "User updated!" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    await user.destroy();

    res.json({ message: "deleted user!" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
      errMessage: err.message,
      errors: err.errors,
    });
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      const err = new Error("This email is already used!");
      err.status = 400;
      throw err;
    }

    if (password !== confirmPassword) {
      const err = new Error("Passwords don't match!");
      err.status = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

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
    };

    const token = jwt.sign(payload, "my-secret", { expiresIn: "24h" });

    res.json({
      message: "user logged in successfully!",
      token,
    });
  } catch (err) {
    next(err);
  }
};
