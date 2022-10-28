const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const getVoter = async (req, res) => {
    const {voter_id} = req.params;
    Voter.findOne({voter_id:voter_id}, async (err, voter) => {
        if(err)
        return res.status(404).json("Voter not found");
        return res.status(200).json(voter);
    })
}

const viewElectionAsVoter = async (req, res) => {
    const {email, election_id} = req.params;
    const election = await Election.findById(election_id).select("-admin -moderators");
    if(!election)
    return res.status(404).json("Election not found");
    if(!election.voters.includes(email))
    return res.status(401).json("Unauthorized");
    res.status(200).json(election);
}

const vote = async (req, res) => {
    const {id, party_id,candidate_id} = req.body;
    const voter = await Voter.findById(id).select();
    if(!voter)
    return res.status(404).json("Voter not found");
    if(voter.voted == 1)
    return res.status(400).json("Already voted");
    
    const party = await Party.findOne({_id: party_id}).select();
    if(!party)
    return res.status(404).json("Party not found");
    party.candidates.forEach((candidate) => {
        if(candidate._id == candidate_id) {
            candidate.score+=1;
        }
    })
    party.save();
    voter.voted = 1;
    voter.voting_time = new Date(Date.now()).toUTCString();
    await voter.save();
    return res.status(200).json("Voted Successfully");
}

const viewParties = async (req, res) => {
    const {election_id} = req.params;
    Party.find({election: election_id}, async (err, parties) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        return res.status(200).json(parties);
    })
}

module.exports = {
    getVoter,
    viewElectionAsVoter,
    vote,
    viewParties
}