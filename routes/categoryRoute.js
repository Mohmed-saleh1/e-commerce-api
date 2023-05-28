const express = require('express')
const router = express.Router();
const {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
} = require('../services/categoryService');

router.route('/').get(getCategories).post(createCategory).delete(deleteAllCategories)
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory)

module.exports=router;