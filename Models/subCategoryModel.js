const mongoose = require('mongoose')
 
const subCategorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minlength:[5,  'the name is too short'],
        maxlength:[30, 'the name is too long'],
        unique:[true,  'the subCategory should be unique'] },
        slug:{
            type:String,
            lowercase:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:[true,'subCategory must be belong to parent category '],
        },
     },{timestamp:true} )
const subCategoryModel = mongoose.model('Category',)

     module.exports={subCategorySchema,subCategoryModel}