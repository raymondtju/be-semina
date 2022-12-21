const Images = require("../../api/v1/images/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllImages = async () => {
  const result = await Images.find();
  return result;
};

const createImages = async (req) => {
  console.log(req.file);
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

const checkImages = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) {
    throw new NotFoundError("Image not found");
  }

  return result;
};

module.exports = {
  getAllImages,
  createImages,
  checkImages,
};
