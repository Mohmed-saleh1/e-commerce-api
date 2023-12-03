const mongoose = require('mongoose')

const userSchema = new mongoose.schema({
    name: {
        type: String,
        required: [true,'name is required'],
        trim:true
    },
    slug:{
        type: String,
        lowercase:true
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: [true,'password is required'],
        minlength: [6,'Too short password']
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

module.exports = User