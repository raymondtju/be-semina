const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config");

const createJWT = ({ payload }) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
};

const verifyJWT = (token) => {
  return jwt.verify(token, jwtSecret);
};

module.exports = {
  createJWT,
  verifyJWT,
};
