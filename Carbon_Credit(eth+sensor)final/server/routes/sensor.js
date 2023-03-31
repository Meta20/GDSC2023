const express = require("express");
const { sensorData } = require("../controller/sensor");
const router = express.Router();

router.get("/sensor", sensorData);

module.exports = router;