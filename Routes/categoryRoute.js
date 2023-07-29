const express = require('express')
const router = express.Router()
const {
  getCategoryValidation,
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation
} = require('../Utils/categoryValidation')
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deletCategory,
}= require('../Services/CategoryService')
  
  router.route('/').get(getCategories).post(createCategoryValidation,createCategory)

  router.route('/:id').get(getCategoryValidation,getCategory).put(updateCategoryValidation,updateCategory).delete(deleteCategoryValidation,deletCategory)

module.exports=router;