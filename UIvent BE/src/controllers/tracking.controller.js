const participantRepository = require('../repositories/tracking.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getStatusByEvent = async (req, res) => {
    try {
        const status = await participantRepository.getStatusByEvent(req.params.eventId);

        if (!status?.length) {
            return baseResponse(res, false, 404, "Event not found", null);
        }

        return baseResponse(res, true, 200, "Event status retreived succesfully", status);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}