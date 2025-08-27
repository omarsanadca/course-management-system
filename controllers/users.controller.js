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
    const user = await User.findByPk(req.params.id);
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

export const updateUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    await user.update(userData, { fields: ["name", "email"] });

    res.json({ message: "User updated!" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
      errMessage: err.message,
      errors: err.errors,
    });
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
