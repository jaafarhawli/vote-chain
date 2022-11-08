const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const incrementCandidateVotes = async (party_id, candidate_id, voter, res) => {
    const party = await Party.findOne({_id: party_id}).select();
    if(!party)
    return res.status(404).json({message:"Party not found"});
    party.candidates.forEach((candidate) => {
        if(candidate._id == candidate_id) {
            candidate.score+=1;
        }
    })
    party.save();
    voter.voted = 1;
    voter.voting_time = new Date(Date.now()).toUTCString();
    await voter.save();
    return res.status(200).json({message:"Voted Successfully"});
}




module.exports = {
    incrementCandidateVotes
}