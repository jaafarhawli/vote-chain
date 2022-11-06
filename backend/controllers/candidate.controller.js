const Election = require('../models/elections.model');
const User = require('../models/users.model');
const Party = require('../models/parties.model');

const addCandidate = async (req, res) => {
    const {name, party_id} = req.body;
    Party.findById(party_id, async (err, party) => {
        if(err) 
        return res.status(404).json("Party not found");
        if(!party)
        return res.status(404).json("Party not found");
        const candidate = {
            name: name,
            score: 0,
            picture_url: ""
        }
        party.candidates.push(candidate);
        party.save();
        res.status(200).json(party.candidates[party.candidates.length-1]);    
    });
}

const removeCandidate = async (req, res) => {
    const {candidate_id, party_id} = req.body;
    try {
    await Party.updateOne({"_id": party_id}, {"$pull": {
        "candidates": {"_id": candidate_id}
    }})
    return res.status(200).json("Candidate removed successfully");
    } catch (err) {
        return res.status(500).json({ err });
    }
}

module.exports = {
    addCandidate, 
    removeCandidate
}