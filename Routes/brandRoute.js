const express = require('express')

const router = express.Router()
const {
  getBrandValidation,
  createBrandValidation,
  updateBrandValidation,
  deleteBrandValidation
} = require('../Utils/validations/brandValidation')
const {
  getBrand,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
}= require('../Services/brandService')

  router.route('/')
  .get(getBrands)
  .post(createBrandValidation,createBrand)

  router.route('/:id')
  .get(getBrandValidation,getBrand)
  .put(updateBrandValidation,updateBrand)
  .delete(deleteBrandValidation,deleteBrand)

module.exports=router;