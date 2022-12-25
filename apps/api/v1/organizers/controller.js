const { createOrganizers } = require("../../../services/mongoose/users");

const { StatusCodes } = require("http-status-codes");

const create = async (req, res, next) => {
  try {
    const result = await createOrganizers(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
};
