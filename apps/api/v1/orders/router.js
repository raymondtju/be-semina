const express = require("express");
const router = express();
const { getAll, create } = require("./controller");
const { authUser, authRoles } = require("../../../middleware/auth");

router.get(
  "/orders",
  authUser,
  authRoles("organizer", "admin", "owner"),
  getAll
);

router.post(
  "/orders",
  authUser,
  authRoles("organizer", "admin", "owner"),
  create
);

module.exports = router;
