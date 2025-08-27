import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const profileData = await user.getProfile();
    res.json({ message: "get user profile data", profileData });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const fillProfile = async (req, res) => {
  try {
    const profileData = req.body;

    const user = await User.findByPk(req.params.userId);

    await user.createProfile({ age: profileData.age });

    res.status(201).json({ message: "Profile DONE!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profileData = req.body;

    const user = await User.findByPk(req.params.userId);

    const profile = await user.getProfile();

    await profile.update(profileData, { fields: ["age"] });

    res.json({ message: "user profile updated!" });
  } catch (err) {
    res.status(500).json({
      message: "Server Error!",
      errMessage: err.message,
      errors: err.errors,
    });
  }
};
