const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const path = require("path");

const app = express();

const categoriesRouter = require("./apps/api/v1/categories/router");
const imagesRouter = require("./apps/api/v1/images/router");
const talentsRouter = require("./apps/api/v1/talents/router");
const eventsRouter = require("./apps/api/v1/events/router");
const organizersRouter = require("./apps/api/v1/organizers/router");
const authCMSRouter = require("./apps/api/v1/auth/router");
const ordersRouter = require("./apps/api/v1/orders/router");
const participantsRouter = require("./apps/api/v1/participants/router");
const paymentsRouter = require("./apps/api/v1/payments/router");
const v1 = "/api/v1";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

app.use(express.static("public"));
app.use(`${v1}/cms`, categoriesRouter);
app.use(`${v1}/cms`, imagesRouter);
app.use(`${v1}/cms`, talentsRouter);
app.use(`${v1}/cms`, eventsRouter);
app.use(`${v1}/cms`, organizersRouter);
app.use(`${v1}/cms`, authCMSRouter);
app.use(`${v1}/cms`, ordersRouter);
app.use(`${v1}`, participantsRouter);
app.use(`${v1}`, paymentsRouter);

const notFound = require("./apps/middleware/not-found");
const errorHandler = require("./apps/middleware/handler-error");
app.use(notFound);
app.use(errorHandler);

module.exports = app;
