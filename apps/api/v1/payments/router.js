const express = require("express");
const router = express();

const { getAll, getOne, create, update, remove } = require("./controller");
const { authUser, authRoles } = require("../../../middleware/auth");

router.get("/payments", authUser, authRoles("organizer"), getAll);
router.get("/payments/:id", authUser, authRoles("organizer"), getOne);
router.post("/payments", authUser, authRoles("organizer"), create);
router.put("/payments/:id", authUser, authRoles("organizer"), update);
router.delete("/payments/:id", authUser, authRoles("organizer"), remove);

module.exports = router;
