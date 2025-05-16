const orgsController = require("../controllers/orgs.controller");
const { authenticate, authorize } = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();

router.post('/', authenticate, authorize("admin"), orgsController.createOrganization);
router.get('/', orgsController.getAllOrganizations);
router.put('/:id', authenticate, authorize("org", "admin"), orgsController.updateOrganization);
router.delete('/:id', authenticate, authorize("admin"), orgsController.deleteOrganization);

module.exports = router;