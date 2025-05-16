const statRepository = require('../repositories/statistic.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.getAllEventsStatistics = async (req, res) => {
    try {
        const statistics = await statRepository.getAllEventsStatistics();

        if (!statistics?.length) {
            return baseResponse(res, false, 404, "No statistics found", null);
        }

        return baseResponse(res, true, 200, "Statistics retrieved successfully", statistics);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getGeneralStatistics = async (req, res) => {
    try {
        const statistics = await statRepository.getGeneralStatistics();

        if (!statistics) {
            return baseResponse(res, false, 404, "No statistics found", null);
        }

        return baseResponse(res, true, 200, "Statistics retrieved successfully", statistics);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getEventStatisticsByOrganizer = async (req, res) => {
    if (req.params.organizerId !== req.user.organization && req.user.role !== "admin") {
        return baseResponse(
            res, 
            false, 
            403, 
            "You are not authorized to view this organization's statistics", 
            null
        );
    }
    
    try {
        const statistics = await statRepository.getEventStatisticsByOrganizer(req.params.organizerId);

        if (!statistics?.length) {
            return baseResponse(res, false, 404, "No statistics found", null);
        }

        return baseResponse(res, true, 200, "Statistics retrieved successfully", statistics);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getGeneralStatisticsByOrganizer = async (req, res) => {
    if (req.params.organizerId !== req.user.organization && req.user.role !== "admin") {
        return baseResponse(
            res, 
            false, 
            403, 
            "You are not authorized to view this organization's statistics", 
            null
        );
    }
    
    try {
        const statistics = await statRepository.getGeneralStatisticsByOrganizer(req.params.organizerId);

        if (!statistics) {
            return baseResponse(res, false, 404, "No statistics found", null);
        }

        return baseResponse(res, true, 200, "Statistics retrieved successfully", statistics);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}


