const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required',
    },

    name: {
        type: String
    },
    
    voter_id: {
        type: Number,
    },

    voter_key: {
        type: String
    },

    election_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Election'
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