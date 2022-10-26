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

    ballots: [{
        type: Schema.Types.ObjectId, ref: 'Ballot'
    }],
    
    moderator_for: [{
        type: Schema.Types.ObjectId, ref: 'Ballot'
    }],
})

const User = mongoose.model('User', userSchema);

module.exports = User;