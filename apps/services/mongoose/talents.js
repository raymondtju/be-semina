const Talents = require("../../api/v1/talents/model");
const { checkImages } = require("./images");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let field = { organizer: req.user.organizer };
  if (keyword) {
    field = {
      ...field,
      name: { $regex: keyword, $options: "i" },
    };
  }

  const result = await Talents.find(field)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result) {
    throw new NotFoundError(`No talent with id :  ${id}`);
  }

  return result;
};

const createTalents = async (req) => {
  console.log(req.user.organizer);
  const { name, role, image } = req.body;

  await checkImages(image);

  const checkName = await Talents.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (checkName) {
    throw new BadRequestError("Talent name already exists");
  }

  const result = await Talents.create({
    name,
    role,
    image,
    organizer: req.user.organizer,
  });
  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  await checkImages(image);

  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  if (check) throw new BadRequestError("Talent name already exists");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`No talents with id :  ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result) throw new NotFoundError(`No talents with id :  ${id}`);

  await result.remove();

  return result;
};

const checkTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });
  console.log(result);

  if (!result) throw new NotFoundError(`No talents with id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  getOneTalents,
  createTalents,
  updateTalents,
  deleteTalents,
  checkTalents,
};
