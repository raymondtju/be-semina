const {
  getAllOrders,
  createOrders,
} = require("../../../services/mongoose/orders");

const { StatusCodes } = require("http-status-codes");

const getAll = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createOrders(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  create,
};
