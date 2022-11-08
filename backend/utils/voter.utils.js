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

const generateVoterId  = () => {
    let voter_id = Math.random().toString().slice(2,11);
    let id_exists = Election.findOne({voter_id: voter_id});
    while(id_exists.length==1) {
        voter_id = Math.random().toString().slice(2,11);
        id_exists = Election.findOne({voter_id: voter_id});
    }
    return voter_id;
}

const generateVoterKey  = () => {
    let voter_key = Math.random().toString(36).substring(2,11);
    let key_exists = Election.findOne({voter_key: voter_key});
    while(key_exists.length==1) {
        voter_key = Math.random().toString(36).substring(2,11);
        key_exists = Election.find({key_exists: voter_key});
    }
    return voter_key;
}



module.exports = {
    incrementCandidateVotes,
    generateVoterId, 
    generateVoterKey
}