const express = require("express");
const { generateAnswer1 } = require("../controllers/openaiController");
const router = express.Router();

router.post("/generateAnswer", generateAnswer1);

module.exports = router;
