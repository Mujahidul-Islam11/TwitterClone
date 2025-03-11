const User = require("../models/user.model");

const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({username}).select("-password");
    if(!user){
        return res.status(404).json({error: "User Not Found"});
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
};

const followUnfollow = async (req, res) => {};

const updateProfile = async (req, res) => {};

module.exports = {
  getUserProfile,
  followUnfollow,
  updateProfile,
};
