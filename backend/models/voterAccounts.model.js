const mongoose = require('mongoose');

const voterAccountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required',
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
        election_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Elections',
            
        },  
        voter_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Voter'
        }
    }],
    
})

const VoterAccount = mongoose.model('VoterAccount', voterAccountSchema);

module.exports = VoterAccount;