const jwt = require("jsonwebtoken");
const generateAccessToken = require("../services/token/generateAccessToken");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;
  const refreshToken = req.cookies.refreshToken;

  // Helper function to respond with 403 status and message
  const sendAccessDenied = () => {
    return res.status(403).json({ message: "Access Denied" });
  };

  // If no access token, check for refresh token
  if (!token) {
    if (!refreshToken) {
      return sendAccessDenied();
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        console.error("Invalid refresh token", err.message);
        return res.status(403).json({ message: "Invalid refresh token", success: false });
      }

      // Generate a new access token if refresh token is valid
      const newAccessToken = generateAccessToken(user);
      res.cookie("authToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000,
      });

      req.user = user; // Assign user data from refresh token
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    // Verify the access token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // Check if the error is due to token expiration
        if (err.name === "TokenExpiredError") {
          console.log("Access token expired. Attempting to refresh...");

          // Try to refresh the token with the refresh token
          if (!refreshToken) {
            return sendAccessDenied(); // No refresh token, access denied
          }

          jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
              console.error("Invalid refresh token", err.message);
              return res.status(403).json({ message: "Invalid refresh token", success: false });
            }

            // Generate a new access token
            const newAccessToken = generateAccessToken(user);
            res.cookie("authToken", newAccessToken, {
              httpOnly: true,
              secure: true,
              maxAge: 5 * 60 * 1000,
            });

            req.user = user; // Assign user data from refresh token
            next(); // Proceed to the next middleware or route handler
          });
        } else {
          console.log("Access token invalid.", err.message);
          return res.status(403).json({ message: "Invalid access token", success: false });
        }
      } else {
        req.user = user; // Token is valid, assign user data
        next(); // Proceed to the next middleware or route handler
      }
    });
  }
};

module.exports = verifyToken;
