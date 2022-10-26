const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
    }, 

    password: {
        type: String,
        required: 'Password is required',
        minlength: 8,
        select: false
    },

    voted: {
        type: Boolean,
    }, 
    
    voting_time: {
        type: Date,
    }, 

    ballots: [{
        type: Schema.Types.ObjectId, ref: 'Ballot'
    }],

})

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;