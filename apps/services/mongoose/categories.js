const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find();

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;

  const check = await Categories.findOne({ name });
  if (check) {
    throw new BadRequestError(`Category with name ${name} already exists`);
  }

  const result = await Categories.create({ name });
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id });

  const check = await Categories.findOne({ _id: id });
  if (!check) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const check = await Categories.findOne({ _id: id });
  if (!check) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }

  const checkName = await Categories.findOne({
    name,
    _id: { $ne: id },
  });
  console.log(checkName);
  if (checkName) {
    throw new BadRequestError(`Category with name ${name} already exists`);
  }

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name: name },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;
  const check = await Categories.findOne({ _id: id });

  if (!check) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }

  const result = await Categories.findOneAndRemove({ _id: req.params.id });
  return result;
};

const checkCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });
  if (!result) {
    throw new BadRequestError(`Category with id ${id} not found`);
  }
  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkCategories,
};
