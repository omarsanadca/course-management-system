// import { User } from "../models/user.model.js";

import userModel from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    const profileData = user.profile;
    res.json({ message: "get user profile data", profileData });
  } catch (err) {
    next(err);
  }
};

export const fillProfile = async (req, res, next) => {
  try {
    const profileData = req.body;

    const user = await userModel.findById(req.userId);

    user.profile = profileData;

    await user.save();

    res.status(201).json({ message: "Profile DONE!" });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profileData = req.body;

    const user = await userModel.findById(req.userId);

    user.profile = profileData;

    await user.save();

    res.json({
      message: "user profile updated!",
      newProfileData: user.profile,
    });
  } catch (err) {
    next(err);
  }
};
