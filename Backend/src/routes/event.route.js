const express = require("express");
const eventController = require("../controllers/event.controller");
const { authenticate, authorize } = require('../middleware/auth.middleware');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', authenticate, authorize("org", "admin"), upload.single("image"), eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.get('/orgs/:organizationId', eventController.getEventsByOrganizer);
router.put('/:id', authenticate, authorize("org", "admin"), upload.single("image"), eventController.updateEvent);
router.delete('/:id', authenticate, authorize("org", "admin"), eventController.deleteEvent);

module.exports = router;
