const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizers/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createOrganizers = async (req) => {
  const { organizer, email, password, confirmPassword, name, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password doesn't match");
  }

  const result = await Organizers.create({ organizer });
  const users = await Users.create({
    name,
    email,
    password,
    role,
    organizer: result._id,
  });

  delete users._doc.password;
  return users;
};

const createAdmins = async (req) => {
  const { email, password, confirmPassword, name } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError("Password doesn't match");
  }

  const users = await Users.create({
    name,
    email,
    password,
    organizer: req.user.organizer,
  });

  delete users._doc.password;
  return users;
};

module.exports = {
  createOrganizers,
  createAdmins,
};
