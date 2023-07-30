const {check}=require('express-validator')

const validationMiddleware = require('../../MIddlewares/validator')

exports.getSubCategoryValidation = [
     
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

exports.createSubCategoryValidation = [
     check('name')
     .notEmpty()
     .withMessage("subCategory name required ")
     .isLength({max:30}).withMessage('the name is too long')
     .isLength({min:2}).withMessage( 'the name is too short'),

     check('category')
     .notEmpty().withMessage('subCategory must be belong to category')

     .isMongoId().withMessage(`invalid mongo id form `)
     ,validationMiddleware
];

exports.deleteSubCategoryValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

exports.updateSubCategoryValidation = [
    check('name')
    .notEmpty().withMessage(`Subcategory required `)
    .isLength({max:30}).withMessage('the name is too long')
    .isLength({min:5}).withMessage( 'the name is too short'),
    check('category')
    .notEmpty().withMessage('subCategory must be belong to category')
    .isMongoId().withMessage(`invalid mongo id form `)
        ,validationMiddleware
];
  