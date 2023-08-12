const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter you name '],
        minlength:[5,  'the name is too short'],
        maxlength:[30, 'the name is too long'],
        unique:[true,  'the category should be unique']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},{timestamp:true})

exports.categoryModel =  mongoose.model('Category',categorySchema);
