const express = require("express");
const router = express();

const {
  signup,
  activate,
  login,
  events,
  oneEvents,
  orders,
  checkout,
} = require("./controller");
const { authParticipant } = require("../../../middleware/auth");

router.post("/auth/signup", signup);
router.post("/auth/activate", activate);
router.post("/auth/login", login);

router.get("/events", events);
router.get("/events/:id", oneEvents);
router.get("/orders", authParticipant, orders);

router.post("/checkout", authParticipant, checkout);

module.exports = router;
