const mongoose = require('mongoose');

const ballotSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
    }, 
    
    start_time: {
        type: Date,
        required: 'Start time is required',
    }, 
    
    end_time: {
        type: Date,
        required: 'End time is required',
    },
    
    timezone: {
        type: String,
        required: 'Time zone is required',
    },

    ballot_code: {
        type: String
    },

    admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    
    moderators: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    
    voters: [{
        type: String
    }],

    parties: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Party'
    }],
})

const Ballot = mongoose.model('Ballot', ballotSchema);

module.exports = Ballot;