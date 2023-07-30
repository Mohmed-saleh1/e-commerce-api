
const asyncHandler=require('express-async-handler')

const slugify = require('slugify')

const SubCategoryModel = require('../Models/subCategoryModel')
const ApiError = require('../Utils/apError')


exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.create({
      name,
      slug: slugify(name),
      category,
    });
    res.status(201).json({ data: subCategory });
  });

  exports.getAllSubCategory=asyncHandler(async(req,res)=>{

    const page =req.query.page||1;
      const limit =req.query.limit|| 3;
      const skip = (page-1)*limit;
      const subCategories = await SubCategoryModel.find({}).limit(limit).skip(skip)

        res.status(200).json({results:subCategories.length,page,data:subCategories})
      });

  exports.getSubCategoryById=asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const subCategory = await SubCategoryModel.findById(id)
    if(!subCategory){
      return next(new ApiError(`the category for this id ${id} not found `,404))
    }
    res.status(200).json({data:subCategory})
  });


  exports.deleteSubCategoryById=asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const subCategory = await SubCategoryModel.findByIdAndDelete(id)
    if(!subCategory){
      return next(new ApiError(`the category for this id ${id} not found `,404))
    }
    res.status(200).json({data:subCategory})
  });

  exports.updateSubCategoryById=asyncHandler(async(req,res,next)=>{
  const {id} = req.params
  const {name} = req.body
  const subCategory = await SubCategoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
  if(!subCategory){
    return next(new ApiError(`the category for this id ${id} not found `,404))
  }
  res.status(200).json({data:subCategory})
  })  