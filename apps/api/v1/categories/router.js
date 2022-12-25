const express = require("express");
const router = express();

const { create, findAll, findOne, update, remove } = require("./controller");
const { authUser, authRoles } = require("../../../middleware/auth");

router.get("/categories", authUser, authRoles("organizer"), findAll);
router.get("/categories/:id", authUser, authRoles("organizer"), findOne);

router.post("/categories", authUser, authRoles("organizer"), create);

router.put("/categories/:id", authUser, authRoles("organizer"), update);

router.delete("/categories/:id", authUser, authRoles("organizer"), remove);

module.exports = router;
