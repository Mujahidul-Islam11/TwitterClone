const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
    httpOnly: true, // Secure, prevents JavaScript access
    secure: process.env.NODE_ENV === "development", // Only HTTPS in production
    sameSite: "strict" // Prevent CSRF attacks
  });
};

module.exports = generateTokenAndSetCookie;
