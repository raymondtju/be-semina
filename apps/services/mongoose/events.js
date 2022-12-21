const Events = require("../../api/v1/events/model");

const { checkImages } = require("./images");
const { checkCategories } = require("./categories");
const { checkTalents } = require("./talents");

const { BadRequestError, NotFoundError } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent, statusEvent } = req.query;

  let field = {};
  if (keyword) {
    field = { ...field, title: { $regex: keyword, $options: "i" } };
  }
  if (category) {
    field = { ...field, category: category };
  }
  if (talent) {
    field = { ...field, talent: talent };
  }
  if (statusEvent) {
    field = { ...field, statusEvent: statusEvent };
  }

  const result = await Events.find(field)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: {
        path: "image",
        select: "_id name",
      },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  const check = await Events.findOne({
    title,
  });
  if (check) {
    throw new BadRequestError("Event already exists");
  }

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: {
        path: "image",
        select: "_id name",
      },
    });

  if (!result) {
    throw new NotFoundError(`No event with id :  ${id}`);
  }

  return result;
};

const updateEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;
  const { id } = req.params;

  await checkImages(image);
  await checkCategories(category);
  await checkTalents(talent);

  const check = await Events.findOne({
    title,
    _id: { $ne: id },
  });

  if (check) {
    throw new BadRequestError("Event title has already exists");
  }

  const result = await Events.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title,
      date,
      about,
      tagline,
      keyPoint,
      venueName,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  );

  if (!result) {
    throw new NotFoundError(`No event with id :  ${id}`);
  }

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`No event with id :  ${id}`);

  await result.remove();

  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
