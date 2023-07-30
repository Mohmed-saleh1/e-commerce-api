const express = require('express');

const router = express.Router();

const {createSubCategoryValidation} = require('../Utils/validations/subCategoryValidation')
const {createSubCategory} = require('../Services/subCategoryService')

router
.route('/')
.post(createSubCategoryValidation,createSubCategory)

// export
module.exports=router;