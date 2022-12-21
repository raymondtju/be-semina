const express = require("express");
const router = express();

const { create, getAll, getOne, update, remove } = require("./controller");

router.get("/events", getAll);
router.get("/events/:id", getOne);

router.post("/events", create);

router.put("/events/:id", update);

router.delete("/events/:id", remove);

module.exports = router;
