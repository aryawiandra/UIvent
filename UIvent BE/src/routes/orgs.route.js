const orgsController = require("../controllers/orgs.controller");
const express = require('express');
const router = express.Router();

router.post('/', orgsController.createOrganization);
router.get('/', orgsController.getAllOrganizations);
router.put('/:id', orgsController.updateOrganization);
router.delete('/:id', orgsController.deleteOrganization);

module.exports = router;