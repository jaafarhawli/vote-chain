const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
    },
    
    voter_id: {
        type: Number,
    },

    voter_key: {
        type: String
    },

    ballot_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Ballot'
    },

    voted: {
        type: Boolean,
    },

    voting_time: {
        type: Date,
    }, 

})

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;