const eventController = require("../controllers/event.controller");
const { authenticate, authorize } = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', authenticate, authorize("org", "admin"), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/orgs/:organizationId', eventController.getEventsByOrganizer);
router.put('/:id', authenticate, authorize("org", "admin"), eventController.updateEvent);
router.delete('/:id', authenticate, authorize("org", "admin"), eventController.deleteEvent);

module.exports = router;