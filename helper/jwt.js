require("dotenv").config();

const jwt = require("jsonwebtoken");

const secretKeys = process.env.JWT_SECRET_KEY;

const createToken = (data) => {
  const expiresIn = "1h";
  return jwt.sign(data, secretKeys, { expiresIn });
};

module.exports = createToken;
