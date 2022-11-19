const mongoose = require('mongoose');

const electionsSchema = new mongoose.Schema({
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

    code: {
        type: String
    },

    contract_address: {
        type: String
    },
    
    description: {
        type: String
    },
    
    launched: {
        type: Boolean
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

    applying_voters: [{
        email: String,
        wallet_address: String
    }]
})

const Elections = mongoose.model('Elections', electionsSchema);

module.exports = Elections;