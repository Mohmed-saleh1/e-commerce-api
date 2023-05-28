const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');


exports.createCategory = asyncHandler( async (req,res,next)=>{
    const name = req.body.name;
    const category = await categoryModel.create({name,slug:slugify(name)});
    res.status(201).json({data:category})
  }
)

exports.getCategories =asyncHandler(async(req,res)=>{

  const page =req.query.page||1;
  const limit = req.query.limit||5;
  const skip = (page-1)*limit;
 
 const categories = await categoryModel.find({}).skip(skip).limit(limit)
 res.status(200).json({results:categories.length,page,data:categories})
})

exports.getCategoryById = asyncHandler( async(req,res)=>{
   const {id}=req.params;
   const category = await categoryModel.findById(id);
   if (!category){
    res.status(404).json({msg:`no category founded for id ${id}`})
   }else{
    res.status(200).json({data:category})
   }
}
)

exports.updateCategory = asyncHandler(async(req,res)=>{
  const {name} = req.body;
  const {id} = req.params;

  const category = await categoryModel.findByIdAndUpdate(
    {_id:id},
    {name,slug:slugify(name)},
    {new:true}
    )
  if (!category){
    res.status(404).json({msg:`no category founded for id ${id}`})
   }else{
    res.status(200).json({data:category})
   }
})

exports.deleteCategory = asyncHandler(async(req,res)=>{
   const {id} = req.params;

  const category = await categoryModel.findOneAndDelete(id)
  if (!category){
    res.status(404).json({msg:`no category founded for id ${id}`})
   }else{
    res.status(200).json({data:category})
   }
})

exports.deleteAllCategories = asyncHandler(async(req,res)=>{
 
 const category = await categoryModel.deleteMany({})
 if (!category){
   res.status(404).json({msg:`no categories founded  ...... `})
  }else{
   res.status(200).json({data:category})
  }
})