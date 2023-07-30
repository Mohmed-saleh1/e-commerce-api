 const slugify =require('slugify')
 const asyncHandler = require('express-async-handler')
 const {categoryModel}=require('../Models/categoryModel')
 const ApiError = require('../Utils/apError')
 

 exports.getCategories =asyncHandler( async(req,res)=>{
      const page =req.query.page||1;
      const limit =req.query.limit|| 3;
      const skip = (page-1)*limit;
      const categories = await categoryModel.find({}).limit(limit).skip(skip)

        res.status(200).json({results:categories.length,page,data:categories})
      } 
  )

  exports.createCategory = asyncHandler( async(req,res)=>{
    
    const {name} = req.body
    const category = await categoryModel.create({name,slug:slugify(name)})
      res.status(201).json({data:category})

   })


   // find category by it's id 
   exports.getCategory = asyncHandler( async (req,res,next)=>{
    const{id} = req.params
    const category = await categoryModel.findById(id)
    if (!category) {
      return next(new ApiError(`the category for this id ${id} not found `,404))
    }
    res.status(200).json({msg:"the category founded ",category})
   }
)


// update category name by it's id 
exports.updateCategory = asyncHandler(async(req,res,next)=>{
  const {id}=req.params
  const {name}=req.body
  const category = await categoryModel.findOneAndUpdate(
    {_id:id},
    {name,slug:slugify(name)},
    {new:true}
  )
  if (!category) {
    return next(new ApiError(`the category for this id ${id} not found `,404))
   }
  res.status(200).json({msg:"the category updated ",category})
})

// delete category by it's id
exports.deletCategory = asyncHandler(async(req,res,next)=>{

 const {id}=req.params
 const category = await categoryModel.findByIdAndDelete(id);

 if (!category) { return next( new ApiError(`the category for this id ${id} not found `,404)) }

res.status(200).json({msg:"the category deleted ",category})

})
