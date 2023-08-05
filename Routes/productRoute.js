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


router.route('/')
  .get(getProducts)
  .post(createProductValidation,createProduct)


router.route('/:id')
  .get(getProductValidation,getProduct)
  .put(updateProductValidation,updateProduct)
  .delete(deleteProductValidation,deleteProduct)
  

module.exports=router;
