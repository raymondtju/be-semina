const Participants = require("../../api/v1/participants/model");
const Events = require("../../api/v1/events/model");
const Orders = require("../../api/v1/orders/model");
const Payments = require("../../api/v1/payments/model");

const { otpMail } = require("../../services/mail");
const { BadRequestError, NotFoundError } = require("../../errors");
const { createJWT } = require("../../utils/jwt");
const { createTokenParticipant } = require("../../utils/createTokenUser");

const createUsers = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  let result = await Participants.findOne({
    email,
    status: "inactive",
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.email = email;
    result.password = password;
    result.role = role;
    result.otp = Math.floor(Math.random() * 9999);

    await result.save();
  } else {
    result = new Participants({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });

    await result.save();
  }
  await otpMail(email, result);

  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateUsers = async (req, res, next) => {
  const { email, otp } = req.body;

  const check = await Participants.findOne({
    email,
  });
  if (!check) {
    throw new NotFoundError("User not registered");
  }
  if (check && check.otp != otp) {
    throw new BadRequestError("Invalid OTP");
  }

  const result = await Participants.findByIdAndUpdate(
    check._id,
    { status: "active" },
    { new: true }
  );

  delete result._doc.password;

  return result;
};

const loginUsers = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const result = await Participants.findOne({ email });
  if (!result) {
    throw new NotFoundError("User not registered");
  }
  if (result.status != "active") {
    throw new BadRequestError("User not activated");
  }

  const isMatch = await result.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Invalid email or password");
  }

  delete result._doc.password;
  delete result._doc.otp;
  //   console.log(result);
  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getEvents = async () => {
  const result = await Events.find({ statusEvent: "Draft" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");
  // console.log(result);
  return result;
};

const getOneEvents = async (req, res, next) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate("category")
    .populate({
      path: "talent",
      select: "image",
    })
    .populate("image");

  if (!result) {
    throw new NotFoundError("Event not found");
  }
  // console.log(result);
  return result;
};

const getOrders = async (req) => {
  // const { id } = req.params;
  console.log(req.participant.id);
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

const getAllPaymentsByOrganizer = async (req) => {
  const { organizer } = req.params;
  const result = await Payments.find({ organizer: organizer });
  return result;
};

const checkoutOrder = async (req) => {
  const { event, personalDetail, tickets, payment } = req.body;

  const checkEvents = await Events.findOne({
    _id: event,
  });
  if (!checkEvents) {
    throw new NotFoundError("Event not found");
  }

  console.log(checkEvents);
  const checkPayments = await Payments.findOne({
    _id: payment,
  });
  if (!checkPayments) {
    throw new NotFoundError("Payment not found");
  }

  let totalPayment = 0;
  let totalTicketOrder = 0;
  await tickets.forEach((tic) => {
    checkEvents.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.quantity > ticket.stock) {
          throw new NotFoundError("Ticket not enough");
        } else {
          ticket.stock -= tic.quantity;

          totalTicketOrder += tic.quantity;
          totalPayment += tic.ticketCategories.price * tic.quantity;
        }
      }
    });
  });
  await checkEvents.save();

  const historyEvents = {
    title: checkEvents.title,
    date: checkEvents.date,
    about: checkEvents.about,
    venueName: checkEvents.venueName,
    statusEvent: checkEvents.statusEvent,
    image: checkEvents.image,
    category: checkEvents.category,
    talent: checkEvents.talent,
    organizer: checkEvents.organizer,
  };

  const result = new Orders({
    date: new Date(),
    personalDetails: personalDetail,
    history: historyEvents,
    totalPay: totalPayment,
    totalOrderTicket: totalTicketOrder,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    payment,
  });
  await result.save();
  return result;
};

module.exports = {
  createUsers,
  activateUsers,
  loginUsers,
  getEvents,
  getOneEvents,
  getOrders,
  getAllPaymentsByOrganizer,
  checkoutOrder,
};
