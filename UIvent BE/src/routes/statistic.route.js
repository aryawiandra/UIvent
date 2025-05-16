const statController = require("../controllers/statistic.controller");
const { authenticate, authorize } = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/event', authenticate, authorize("admin"), statController.getAllEventsStatistics);
router.get('/', authenticate, authorize("admin"), statController.getGeneralStatistics);
router.get('/event/:organizerId', authenticate, authorize("org", "admin"), statController.getEventStatisticsByOrganizer);
router.get('/:organizerId', authenticate, authorize("org", "admin"), statController.getGeneralStatisticsByOrganizer);

module.exports = router;