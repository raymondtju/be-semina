const {getAllCategories, createCategory, getOneCategory, updateCategory, deleteCategory} = require('../../../services/mongoose/categories');

const {StatusCodes} = require('http-status-codes');

const findAll = async (req, res, next) => {
  try {
    const result = await getAllCategories()
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const create = async (req, res, next) => {
  try {
    const result = await createCategory(req)

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const findOne = async (req, res, next) => {
  try {
    const result = await getOneCategory(req)
    
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const result = await updateCategory(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

const remove = async (req, res, next) => {
  try {
    const result = await deleteCategory(req)

    res.status(StatusCodes.OK).json({
      data: result,
    })
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
}