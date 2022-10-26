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

    ballots: [{
        ballot_id: {
            type: Schema.Types.ObjectId, ref: 'Ballot'
        },
        voted: {
            type: Boolean,
        }, 
        voting_time: {
            type: Date,
        }, 
    }],

})

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;