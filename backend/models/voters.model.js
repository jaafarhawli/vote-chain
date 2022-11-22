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

    voter_wallet_address: {
        type: String
    },

    election_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Election'
    },

    voted: {
        type: Boolean,
    },

    chosenParty: {
        type: String,
    },

    chosenCandidate: {
        type: String
    }

})

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;