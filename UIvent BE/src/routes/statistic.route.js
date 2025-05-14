const statController = require("../controllers/statistic.controller");
const express = require('express');
const router = express.Router();

router.get('/event', statController.getAllEventsStatistics);
router.get('/', statController.getGeneralStatistics);
router.get('/event/:organizerId', statController.getEventStatisticsByOrganizer);
router.get('/:organizerId', statController.getGeneralStatisticsByOrganizer);

module.exports = router;