const categoryController = require("../controllers/category.controller");
const express = require('express');
const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;