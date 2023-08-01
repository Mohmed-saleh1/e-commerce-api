const {check}=require('express-validator')

const validationMiddleware = require('../../MIddlewares/validator')

const getBrandValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

const createBrandValidation = [
    check('name')
    .notEmpty().withMessage(`Brand required `)
    .isLength({max:30}).withMessage('the name is too long')
    .isLength({min:3}).withMessage( 'the name is too short')
    ,validationMiddleware
];

const deleteBrandValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

const updateBrandValidation = [
    check('name')
    .notEmpty().withMessage(`Brand required `)
    .isLength({max:30}).withMessage('the name is too long')
    .isLength({min:3}).withMessage( 'the name is too short'),
    validationMiddleware
];

module.exports = {getBrandValidation,createBrandValidation,deleteBrandValidation,updateBrandValidation};