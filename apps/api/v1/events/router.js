const express = require("express");
const router = express();

const { create, getAll, getOne, update, remove } = require("./controller");

const { authUser, authRoles } = require("../../../middleware/auth");

router.get("/events", authUser, authRoles("organizer"), getAll);
router.get("/events/:id", authUser, authRoles("organizer"), getOne);

router.post("/events", authUser, authRoles("organizer"), create);

router.put("/events/:id", authUser, authRoles("organizer"), update);

router.delete("/events/:id", authUser, authRoles("organizer"), remove);

module.exports = router;
