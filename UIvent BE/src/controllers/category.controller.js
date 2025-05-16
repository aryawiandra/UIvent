const categoryRepository = require('../repositories/category.repository');
const baseResponse = require('../utils/baseResponse.util');

exports.createCategory = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, "Missing category name", null);
    }
    try {
        const category = await categoryRepository.createCategory(req.body);
        return baseResponse(res, true, 201, "Category created successfully", category);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryRepository.getAllCategories();

        if (!categories?.length) {
            return baseResponse(res, false, 404, "No categories found", null);
        }

        return baseResponse(res, true, 200, "Categories retrieved successfully", categories);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryRepository.getCategoryById(req.params.id);

        if (!category) {
            return baseResponse(res, false, 404, "Category not found", null);
        }

        return baseResponse(res, true, 200, "Category found", category);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.updateCategory = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, "Missing category name", null);
    }
    try {
        const category = await categoryRepository.updateCategory(req.params.id, req.body);

        if (!category) {
            return baseResponse(res, false, 404, "Category not found", null);
        }

        return baseResponse(res, true, 200, "Category updated successfully", category);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.deleteCategory = async (req, res) => {
    try {       
        const category = await categoryRepository.deleteCategory(req.params.id);

        if (!category) {
            return baseResponse(res, false, 404, "Category not found", null);
        }

        return baseResponse(res, true, 200, "Category deleted successfully", category);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}