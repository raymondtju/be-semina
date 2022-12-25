const express = require("express");
const router = express();

const { getAll, getOne, create, update, remove } = require("./controller");

const { authUser, authRoles } = require("../../../middleware/auth");

router.get("/talents", authUser, authRoles("organizer"), getAll);
router.get("/talents/:id", authUser, authRoles("organizer"), getOne);

router.post("/talents", authUser, authRoles("organizer"), create);

router.put("/talents/:id", authUser, authRoles("organizer"), update);
router.delete("/talents/:id", authUser, authRoles("organizer"), remove);

module.exports = router;
