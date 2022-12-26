const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const categoriesRouter = require("./apps/api/v1/categories/router");
const imagesRouter = require("./apps/api/v1/images/router");
const talentsRouter = require("./apps/api/v1/talents/router");
const eventsRouter = require("./apps/api/v1/events/router");
const organizersRouter = require("./apps/api/v1/organizers/router");
const authCMSRouter = require("./apps/api/v1/auth/router");
const ordersRouter = require("./apps/api/v1/orders/router");
const v1 = "/api/v1/cms";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);
app.use(v1, organizersRouter);
app.use(v1, authCMSRouter);
app.use(v1, ordersRouter);

const notFound = require("./apps/middleware/not-found");
const errorHandler = require("./apps/middleware/handler-error");
app.use(notFound);
app.use(errorHandler);

module.exports = app;
