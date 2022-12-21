const express = require("express");
const router = express();

const { create, getAll } = require("./controller");
const upload = require("../../../middleware/multer");

router.get("/images", getAll);
router.post("/images", upload.single("avatar"), create);

module.exports = router;
