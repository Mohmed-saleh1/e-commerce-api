const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../Utils/apError')

const ProductModel = require('../Models/productModel')

// create Product 

exports.createProduct = asyncHandler (async(req,res)=>{

     req.body.slug = slugify(req.body.title);

    const product = await ProductModel.create(req.body);
    res.status(201).json({
        success: true,
        data: product
    })
});

// get all products
exports.getProducts = asyncHandler (async(req,res)=>{
    
     //filteration 
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryStringObj = {...req.query}
    const excludeFields = ['limit','sort','page','fields'];
    excludeFields.forEach((element) => delete  queryStringObj[element]);
    let queryString = JSON.stringify(queryStringObj);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g,(match)=> `$${match}` )
    queryString = JSON.parse(queryString);

    //pageination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page-1)*limit;

    let mongooseQuery = ProductModel.find(queryString).limit(limit).skip(skip)
    const products = await mongooseQuery;
    
    //sorting
    if(req.query.sort){
        mongooseQuery =  mongooseQuery.sort(req.query.sort)
        console.log(mongooseQuery)
        console.log(req.query.sort);
    }
    
    res.status(200).json({ result:products.length,page,data: products,success: true})
});

// get single product
exports.getProduct = asyncHandler (async(req,res,next)=>{
    const {id}=req.params
    const product = await ProductModel.findById(id);
    if(!product){  return next(new ApiError(`not product found for this id ${id}`,404)) }
    res.status(200).json({ success: true,data: product })
})

// update product

exports.updateProduct = asyncHandler (async(req,res,next)=>{
    const {id}=req.params
    req.body.slug = slugify(req.body.title);
    const product = await ProductModel.findByIdAndUpdate(id,req.body,{new:true});
    if(!product){  return next(new ApiError(`not product found for this id ${id}`,404)) }
    res.status(200).json({ success: true,data: product })
})

// delete product

exports.deleteProduct = asyncHandler (async(req,res,next)=>{
    const {id}=req.params
    const product = await ProductModel.findByIdAndDelete(id);
    if(!product){  return next(new ApiError(`not product found for this id ${id}`,404)) }
    res.status(200).json({ success: true,data: product })
})
