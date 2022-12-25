const Users = require("../../api/v1/users/model");

const {
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
} = require("../../errors");
const { createJWT, verifyJWT } = require("../../utils/jwt");
const { createTokenUser } = require("../../utils/createTokenUser");

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await Users.findOne({ email: email });
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = createJWT({ payload: createTokenUser(user) });
  return token;
};

module.exports = {
  signin,
};
