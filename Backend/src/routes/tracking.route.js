const trackingController = require("../controllers/tracking.controller");
const express = require('express');
const router = express.Router();

router.get('/:eventId', trackingController.getStatusByEvent);

module.exports = router;