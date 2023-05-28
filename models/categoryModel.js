const mongoose= require('mongoose');
require('dotenv').config();


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"the name is required"],
        unique:[true,"category name must be unique"],
        minlength:[3,"Category name is too short"],
        maxlength:[30,"Category name is too long"],
    },
    slug:{
       type:String, 
       lowercase:true,
    },
},{timestamps:true});


const categoryModel = mongoose.model('Categories',categorySchema);


module.exports=categoryModel;