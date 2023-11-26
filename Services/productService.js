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
    excludeFields.forEach((field) => delete  queryStringObj[field]);
    let queryString = JSON.stringify(queryStringObj);

    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g,(match)=> `$${match}` )
    

    //pageination
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page-1)*limit;

    //build query
    let mongooseQuery = ProductModel.find(JSON.parse(queryString)).limit(limit).skip(skip)
    // .populate({path:'Category',select:'name -_id'})
    const products = await mongooseQuery;
    
    // sorting
    if(req.query.sort){
        mongooseQuery =  mongooseQuery.sort(req.query.sort)
        console.log(typeof(req.query.sort));
    }

     //selecting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        mongooseQuery =  mongooseQuery.select(fields)
        console.log(fields);
    }
    res.status(200).json({ result:products.length,page,data: products,success: true})

    //searching
    if(req.query.keyword){
        const query = {};
        
        query.$or = [
            {title:{$regex:req.query.keyword,options:'i'}},
            {description:{ regex:req.query.keyword,options:'i'}}
        ]
        
        mongooseQuery =  mongooseQuery.find(query)
    }
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
