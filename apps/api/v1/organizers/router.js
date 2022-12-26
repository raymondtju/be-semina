const express = require("express");
const router = express();

const { create, createAdmin } = require("./controller");
const { authUser, authRoles } = require("../../../middleware/auth");

router.post("/organizers", authUser, authRoles("owner"), create);
router.post(
  "/organizers/admin",
  authUser,
  authRoles("organizer", "admin"),
  createAdmin
);

module.exports = router;
