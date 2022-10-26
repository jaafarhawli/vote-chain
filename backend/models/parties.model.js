const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    }, 

    election: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Election'
    },

    candidates: [{
        name: {
            type: String,
            required: 'Name is required',
        }, 
        picture_url: String,
        score: Number
    }],
    
})

const Party = mongoose.model('Party', partySchema);

module.exports = Party;