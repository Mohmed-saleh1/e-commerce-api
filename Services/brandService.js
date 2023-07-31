 const slugify =require('slugify')
 const asyncHandler = require('express-async-handler')
 const {brandModel}=require('../Models/brandModel')
 const ApiError = require('../Utils/apError')
 

 exports.getBrands =asyncHandler( async(req,res)=>{
      const page =req.query.page||1;
      const limit =req.query.limit|| 3;
      const skip = (page-1)*limit;
      const Brands = await brandModel.find({}).limit(limit).skip(skip)

        res.status(200).json({results:Brands.length,page,data:Brands})
      } 
  )

  exports.createBrand = asyncHandler( async(req,res)=>{
    
    const {name} = req.body
    const brand = await brandModel.create({name,slug:slugify(name)})
      res.status(201).json({data:brand})
      
   })


   // find brand by it's id 
   exports.getBrand = asyncHandler( async (req,res,next)=>{
    const{id} = req.params
    const brand = await brandModel.findById(id)
    if (!brand) {
      return next(new ApiError(`the brand for this id ${id} not found `,404))
    }
    res.status(200).json({msg:"the brand founded ",brand})
   }
)


// update brand name by it's id 
exports.updateBrand = asyncHandler(async(req,res,next)=>{
  const {id}=req.params
  const {name}=req.body
  const brand = await brandModel.findOneAndUpdate(
    {_id:id},
    {name,slug:slugify(name)},
    {new:true}
  )
  if (!brand) {
    return next(new ApiError(`the brand for this id ${id} not found `,404))
   }
  res.status(200).json({msg:"the brand updated ",brand})
})

// delete brand by it's id
exports.deletbrand = asyncHandler(async(req,res,next)=>{

 const {id}=req.params
 const brand = await brandModel.findByIdAndDelete(id);

 if (!brand) { return next( new ApiError(`the brand for this id ${id} not found `,404)) }

res.status(200).json({msg:"the brand deleted ",brand})

})
