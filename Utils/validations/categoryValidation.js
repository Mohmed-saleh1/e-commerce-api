const {check,body}=require('express-validator')

const validationMiddleware = require('../../MIddlewares/validator')

const getCategoryValidation = [
    check('id').isMongoId().withMessage(`invalid mongo id form `),
    validationMiddleware
];

const createCategoryValidation = [
    check('name')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short category name')
    .isLength({ max: 32 })
    .withMessage('Too long category name')
    // .custom((val, { req}) => {
    //   req.body.slug = slugify(val);
    //   return true;
    // }),
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