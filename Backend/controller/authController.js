const generateTokenAndSetCookie = require("../lib/utils/generateToken");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if(existingUser){
        return res.status(400).json({error: "Username is already taken"});
    }

    const existingEmail = await User.findOne({ email });
    if(existingEmail){
        return res.status(400).json({error: "Email is already taken"});
    }

    // hash password 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)

    const newUser = new User({
        fullName,
        username, 
        email,
        password: hash
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            followers: newUser.followers,
            following: newUser.following,
            profileImg: newUser.profileImg,
            coverImg: newUser.coverImg,
        })
    }else{
        res.status(400).json({error: "Invalid user data"})
    }

  } catch (err) {
    res.status(500).json({error: "Internal Server Error"})
  }
};

const login = async (req, res) => {
  res.json({ data: "logged up" });
};

const logOut = async (req, res) => {
  res.json({ data: "Logged out" });
};

module.exports = { login, signUp, logOut };
