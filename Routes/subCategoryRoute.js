const express = require('express');

const router = express.Router({mergeParams:true});

const {
    createSubCategoryValidation,
    getSubCategoryValidation,
    deleteSubCategoryValidation,
    updateSubCategoryValidation,
} = require('../Utils/validations/subCategoryValidation')
const {
    createSubCategory,
    getAllSubCategory,
    getSubCategoryById,
    deleteSubCategoryById,
    updateSubCategoryById,
    setCategoryIdFromBody,
    createFilterObject,
    

} = require('../Services/subCategoryService')

router
.route('/')
.post(setCategoryIdFromBody,createSubCategoryValidation,createSubCategory)
.get(createFilterObject,getAllSubCategory)

router
  .route('/:id')
  .get(getSubCategoryValidation,getSubCategoryById)
  .delete(deleteSubCategoryValidation,deleteSubCategoryById)
  .put(updateSubCategoryValidation,updateSubCategoryById)

// export
module.exports=router;