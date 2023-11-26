const express = require('express')

const router = express.Router()
const {
  getCategoryValidation,
  createCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation
} = require('../Utils/validations/categoryValidation')
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deletCategory,
  uploadCategoryImage,
  resizeImage
}= require('../Services/CategoryService')

const subCategoryRoute = require('./subCategoryRoute')



  router.use('/:categoryId/subcategories',subCategoryRoute)

  router.route('/').get(getCategories).post(uploadCategoryImage,resizeImage,createCategoryValidation,createCategory)

  router.route('/:id').get(getCategoryValidation,getCategory).put(updateCategoryValidation,updateCategory).delete(deleteCategoryValidation,deletCategory)

module.exports=router;