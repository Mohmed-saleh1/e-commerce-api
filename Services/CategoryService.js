 const slugify =require('slugify')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp')

 const asyncHandler = require('express-async-handler')
 const {categoryModel}=require('../Models/categoryModel')
 const ApiError = require('../Utils/apError')

//  const multerStorage = multer.diskStorage({
//   destination:function(req,file,cb){
//    cb(null,'uploads/categories')
//   },

//   filename:function(req,file,cb){
//     const ext = file.mimetype.split('/')[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null,filename)
//   }
//  })
 const multerFilter = (req,file,cb)=>{
  if(file.mimetype!== 'image/jpeg' && file.mimetype!== 'image/png' && file.mimetype!== 'image/jpg'){
    return cb(new ApiError('only jpg,png and jpeg images are allowed',500),false)
  }
  cb(null,true)
 }

 const multerStorage = multer.memoryStorage()

 const upload = multer({storage:multerStorage,fileFilter:multerFilter})
exports.uploadCategoryImage = upload.single('image')

exports.resizeImage= asyncHandler(async (req,res,next)=>{

 const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
  .resize(200,200)
  .toFormat('jpeg')
  .jpeg({quality:90})
  .toFile(`uploads/categories/${filename}.jpeg`)
  req.body.image = filename;

  next();
});

 exports.getCategories =asyncHandler( async(req,res)=>{
      const page =req.query.page||1;
      const limit =req.query.limit|| 3;
      const skip = (page-1)*limit;
      const categories = await categoryModel.find({}).limit(limit).skip(skip)

        res.status(200).json({results:categories.length,page,data:categories})
      } 
  )

  exports.createCategory = asyncHandler( async(req,res)=>{
    
    
    const category = await categoryModel.create(req.body)
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
