import { User } from "../models/user.model.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const profileData = await user.getProfile();
    res.json({ message: "get user profile data", profileData });
  } catch (err) {
    next(err);
  }
};

export const fillProfile = async (req, res, next) => {
  try {
    const profileData = req.body;

    const user = await User.findByPk(req.userId);

    await user.createProfile({ age: profileData.age });

    res.status(201).json({ message: "Profile DONE!" });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profileData = req.body;

    const user = await User.findByPk(req.userId);

    const profile = await user.getProfile();

    const newProfile = await profile.update(profileData, { fields: ["age"] });

    res.json({ message: "user profile updated!", newProfile });
  } catch (err) {
    next(err);
  }
};
