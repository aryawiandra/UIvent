const orgsRepository = require('../repositories/orgs.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.createOrganization = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, "Missing organization name", null);
    }
    try {
        const org = await orgsRepository.createOrganization(req.body);
        return baseResponse(res, true, 201, "Organization created successfully", org);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getAllOrganizations = async (req, res) => {
    try {
        const orgs = await orgsRepository.getAllOrganizations();

        if (!orgs?.length) {
            return baseResponse(res, false, 404, "No organizations found", null);
        }

        return baseResponse(res, true, 200, "Organizations retrieved successfully", orgs);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.updateOrganization = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, "Missing organization name", null);
    }
    try {
        const org = await orgsRepository.updateOrganization(req.params.id, req.body);

        if (!org) {
            return baseResponse(res, false, 404, "Organization not found", null);
        }

        return baseResponse(res, true, 200, "Organization updated successfully", org);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.deleteOrganization = async (req, res) => {
    try {
        const org = await orgsRepository.deleteOrganization(req.params.id);

        if (!org) {
            return baseResponse(res, false, 404, "Organization not found", null);
        }

        return baseResponse(res, true, 200, "Organization deleted successfully", org);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}
