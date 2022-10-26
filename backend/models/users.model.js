const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'first name is required',
    }, 
    
    last_name: {
        type: String,
        required: 'last name is required',
    }, 

    email: {
        type: String,
        required: 'email is required',
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: 'password is required',
        minlength: 8,
        select: false
    },

    ballots: [{
        type: Schema.Types.ObjectId, ref: 'Ballot'
    }],
    
    moderator_for: [{
        type: Schema.Types.ObjectId, ref: 'Ballot'
    }],
})

const User = mongoose.model('User', userSchema);

module.exports = User;