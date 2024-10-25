const jwt = require('jsonwebtoken');

const generateAccessToken = async (data) => {
    const token = await jwt.sign(
        data,
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        }
      )
      return token;
}

module.exports = generateAccessToken;