const participantRepository = require('../repositories/participant.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.addParticipant = async (req, res) => {
    if (!req.body.event_id || !req.body.user_id) {
        return baseResponse(res, false, 400, "Missing user_id or event_id", null);
    }
    try {
        const participant = await participantRepository.addParticipant(req.body);

        if (!participant) {
            return baseResponse(
                res, 
                false, 
                409, 
                "User or event not found or already registered", 
                null
            );
        }

        return baseResponse(res, true, 201, "Participant created successfully", participant);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getParticipantsByEvent = async (req, res) => {
    try {
        const participants = await participantRepository.getParticipantsByEvent(req.params.eventId);

        if (!participants?.length) {
            return baseResponse(res, false, 404, "No participants found", null);
        }

        return baseResponse(res, true, 200, "Participants retrieved successfully", participants);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.deleteParticipant = async (req, res) => {
    try {
        const participant = await participantRepository.deleteParticipant(req.params);
        
        if (!participant) {
            return baseResponse(res, false, 404, "Participant not found", null);
        }
        
        return baseResponse(res, true, 200, "Participant deleted successfully", participant);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

