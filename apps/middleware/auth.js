const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { verifyJWT } = require("../utils/jwt");

const authUser = async (req, res, next) => {
  try {
    let token;

    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Not authorized to access this route");
    }

    const decoded = verifyJWT(token);
    console.log({ decoded: decoded });
    req.user = {
      email: decoded.email,
      role: decoded.role,
      id: decoded.id,
      name: decoded.name,
      organizer: decoded.organizer,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw new UnauthorizedError(
        `User role ${role} is not authorized to access this route`
      );
    }
    next();
  };
};

const authParticipant = async (req, res, next) => {
  try {
    let token;

    let authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Invalid token");
    }

    const decoded = verifyJWT(token);
    console.log({ decoded: decoded });
    req.participant = {
      email: decoded.email,
      id: decoded.id,
      first: decoded.firstName,
      last: decoded.lastName,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authUser,
  authRoles,
  authParticipant,
};
