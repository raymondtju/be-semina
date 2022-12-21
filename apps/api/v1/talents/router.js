const express = require("express");
const router = express();

const { getAll, getOne, create, update, remove } = require("./controller");

router.get("/talents", getAll);
router.get("/talents/:id", getOne);

router.post("/talents", create);

router.put("/talents/:id", update);
router.delete("/talents/:id", remove);

module.exports = router;
