const {check}=require('express-validator')

const validationMiddleware = require('../../MIddlewares/validator')

const getCategoryValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

const createCategoryValidation = [
    check('name')
    .notEmpty().withMessage(`category required `)
    .isLength({max:30}).withMessage('the name is too long')
    .isLength({min:5}).withMessage( 'the name is too short')
    ,validationMiddleware
];

const deleteCategoryValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

const updateCategoryValidation = [
    check('name')
    .notEmpty().withMessage(`category required `)
    .isLength({max:30}).withMessage('the name is too long')
    .isLength({min:5}).withMessage( 'the name is too short'),
    validationMiddleware
];

module.exports = {getCategoryValidation,createCategoryValidation,deleteCategoryValidation,updateCategoryValidation};