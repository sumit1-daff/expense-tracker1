const jwt = require("jsonwebtoken");
const generateAccessToken = require("../services/token/generateAccessToken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json({ message: "Access Denied" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        console.error("Invalid refresh token", err.message);
        return res
          .status(403)
          .json({ message: "Invalid refresh token", success: false });
      }
      const newAccessToken = generateAccessToken(user);
      res.cookie("authToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000,
      });

      req.user = user;
      next();
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("Invalid access token", err);
        return res
          .status(403)
          .json({ message: "Invalid access token", success: false });
      }

      req.user = user;
      next();
    });
  }
};

module.exports = verifyToken;
