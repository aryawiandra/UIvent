const participantController = require("../controllers/participant.controller");
const express = require('express');
const router = express.Router();

router.post('/', participantController.addParticipant);
router.get('/:eventId', participantController.getParticipantsByEvent);
router.delete('/:eventId/:userId', participantController.deleteParticipant);

module.exports = router;