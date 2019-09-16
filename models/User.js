const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

let UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

  
    isDeleted: {
        type: Boolean,
        default: false
    }, 
    
    date: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('User', UserSchema);