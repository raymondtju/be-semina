const {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

const { StatusCodes } = require("http-status-codes");

const findAll = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
