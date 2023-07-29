const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    name:{
        type:String,
    },
    
},{timestamp:true})