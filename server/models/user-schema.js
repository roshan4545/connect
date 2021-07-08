const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    Password: {
        type: String,
        minlength : 8,
        required:true
    },
    Role: {
        type: String,
        enum : ['Admin','Student','Professor','CR']
        // default : 'Student'
    },
    isverified: {
        type : String
    },
    dob: {
        type : Date
    },
    gender: {
        type : String
    },
    department: {
        type : String
    },
    description: {
        type : String 
    }
}, {
        collection: 'registration',
        timestamps:true
    })



module.exports = mongoose.model('registration', userSchema)
