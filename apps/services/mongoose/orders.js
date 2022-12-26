const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  const { limit, page, startDate, endDate } = req.query;

  let field = {};

  if (req.user.role !== "owner") {
    field = {
      ...field,
      "history.organizer": req.user.organizer,
    };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0);
    end.setHours(23, 59, 59);

    field = {
      ...field,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
  }

  //   const check = await Orders.find().populate({
  //     path: "event",
  //     select: "_id title",
  //     match: { organizer: req.user.organizer },
  //   });

  //   console.log({ check: check });

  const result = await Orders.find(field)
    .limit(limit)
    .skip(limit * (page - 1))
    .populate({
      path: "event",
      select: "_id title organizer",
      //   match: { organizer: req.user.organizer },
    });

  //   console.log({ result: result });
  //   if (!result[0].event) {
  //     throw new NotFoundError("Data not found");
  //   }

  const count = await Orders.countDocuments(field);

  return { orders: result, pages: Math.ceil(count / limit), total: count };
};

const createOrders = async (req) => {
  const {
    date,
    personalDetails,
    event,
    payment,
    participant,
    totalOrderTicket,
    totalPay,
    orderItems,
    history,
  } = req.body;

  const result = await Orders.create({
    date,
    personalDetails: {
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      email: personalDetails.email,
      phone: personalDetails.phone,
    },
    event,
    payment,
    participant,
    totalOrderTicket,
    totalPay,
    orderItems: orderItems,
    history: history,
  });
  console.log(result);

  return result;
};

module.exports = {
  getAllOrders,
  createOrders,
};
