const {
  createUsers,
  activateUsers,
  loginUsers,
  getEvents,
  getOneEvents,
  getOrders,
  checkoutOrder,
} = require("../../../services/mongoose/participants");

const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const result = await createUsers(req);
    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const activate = async (req, res, next) => {
  try {
    const result = await activateUsers(req);
    res.status(StatusCodes.OK).json({
      message: "User activated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginUsers(req);
    res.status(StatusCodes.OK).json({
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const events = async (req, res, next) => {
  try {
    const result = await getEvents(req);
    res.status(StatusCodes.OK).json({
      message: "Events fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const oneEvents = async (req, res, next) => {
  try {
    const result = await getOneEvents(req);
    res.status(StatusCodes.OK).json({
      message: "Event fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const orders = async (req, res, next) => {
  try {
    const result = await getOrders(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);
    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  signup,
  activate,
  login,
  events,
  oneEvents,
  orders,
  checkout,
};
