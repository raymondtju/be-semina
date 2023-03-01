const Payments = require("../../api/v1/payments/model");

const { checkImages } = require("./images");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllPayments = async (req) => {
  const result = await Payments.find({
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "id name",
    })
    .select("id type image status");

  return result;
};

const createPayments = async (req) => {
  const { type, image } = req.body;

  await checkImages(image);

  const check = await Payments.findOne({ type, organizer: req.user.organizer });
  if (check) {
    throw new BadRequestError("Payment type already exists");
  }

  const result = await Payments.create({
    type,
    image,
    organizer: req.user.organizer,
  });

  return result;
};

const getOnePayments = async (req) => {
  const { id } = req.params;

  const result = await Payments.find({
    organizer: id,
  })
    .populate({
      path: "image",
      select: "id name",
    })
    .select("id type image status");

  return result;
};

const updatePayments = async (req) => {
  const { id } = req.params;
  const { type, image } = req.body;

  await checkImages(image);

  const check = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!check) {
    throw new NotFoundError("Payment type not found");
  }

  const result = await Payments.findByIdAndUpdate(
    { _id: id, organizer: req.user.organizer },
    {
      type,
      image,
    },
    { new: true }
  );
  return result;
};

const deletePayemnts = async (req) => {
  const { id } = req.params;

  const check = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!check) {
    throw new NotFoundError("Payment type not found");
  }

  const result = await Payments.findByIdAndDelete(
    {
      _id: id,
      organizer: req.user.organizer,
    },
    { new: true }
  );

  return result;
};

const checkPayments = async (id) => {
  const check = await Payments.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!check) {
    throw new NotFoundError("Payment type not found");
  }

  return check;
};

module.exports = {
  getAllPayments,
  createPayments,
  getOnePayments,
  updatePayments,
  deletePayemnts,
  checkPayments,
};
