const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String,
        // required:true,
        unique:true,
        lowercase:true,
        trim:true,
        // validate : [validator.isEmail , 'Please provide a valid email']
    },
    Password: {
        type: String,
        minlength : 8
        // select : false,
        // required:true
    }
    // department: {
    //     type: String
    // }
}, {
        collection: 'registration',
        timestamps:true
    })



module.exports = mongoose.model('registration', userSchema)
