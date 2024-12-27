const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    address: {
        type: Array,
    },
    phone: {
        type: Number,
        required: [true, "phone number is required"]
    },
    userType: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    prifile: {
        type: String,
        default: 'person'
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    }

},{timestamps:true})

module.exports=mongoose.model('User',userSchema)