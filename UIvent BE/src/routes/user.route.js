const userController = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

router.post('/register', userController.registerUser);
// router.post('/register/admin', userController.registerUserByAdmin);
router.post('/login', userController.loginUser);
router.get('/:email', userController.getUser);
router.put('/:email/role', userController.updateRole);
router.put('/:email/name', userController.updateName);
router.put('/:email/password', userController.updatePassword);
router.delete('/:email', userController.deleteUser);

module.exports = router;