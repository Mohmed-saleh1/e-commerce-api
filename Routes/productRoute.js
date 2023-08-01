const express = require('express')

const router = express.Router()

const {
 getProduct,
 getProducts,
 createProduct,
 updateProduct,
 deleteProduct,
} = require('../Services/productService')

const {
    getProductValidation,
    createProductValidation,
    updateProductValidation,
    deleteProductValidation
} = require('../Utils/validations/productValidation')


router.get('/', getProducts)

router.route('/:id')
  .get(getProductValidation,getProduct)
  .post(createProductValidation,createProduct)
  .put(updateProductValidation,updateProduct)
  .delete(deleteProductValidation,deleteProduct)
  