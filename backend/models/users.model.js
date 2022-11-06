const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',
    }, 
    
    last_name: {
        type: String,
        required: 'Last name is required',
    }, 

    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 8,
        select: false
    },

    elections: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Election'
    }],
    
    moderator_for: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Election'
    }],
})

const User = mongoose.model('User', userSchema);

module.exports = User;