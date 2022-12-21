const {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
} = require("../../../services/mongoose/events");

const { StatusCodes } = require("http-status-codes");

const getAll = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await createEvents(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await updateEvents(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await deleteEvents(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = {
  getAll,
  create,
  getOne,
  update,
  remove,
};
