const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Authentication failed, No token provided" });
  }

  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).send({ message: "Token Expired" });
      } else {
        return res.status(401).send({ message: "Unauthorized" });
      }
    }

    req.user = payload;

    next();
  });
};

module.exports = verifyToken;
