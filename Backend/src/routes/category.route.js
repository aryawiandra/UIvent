const categoryController = require("../controllers/category.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const express = require('express');
const router = express.Router();

router.post('/', authenticate, authorize("admin"), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authenticate, authorize("admin"), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize("admin"), categoryController.deleteCategory);

module.exports = router;