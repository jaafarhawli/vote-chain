const { incrementCandidateVotes, generateVoterId, generateVoterKey, addNewVoter, removeVoterFromElection } = require('../utils/voter.utils');

const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
var validator = require("email-validator");
const { sendEmail } = require('./email.controller');

const getVoter = async (req, res) => {
    const {voter_id} = req.params;
    Voter.findOne({voter_id:voter_id}, async (err, voter) => {
        if(err)
        return res.status(404).json({message:"Voter not found"});
        return res.status(200).json({data: voter});
    })
}

const viewElectionAsVoter = async (req, res) => {
    const {email, election_id} = req.params;
    const election = await Election.findById(election_id).select("-admin -moderators");
    if(!election)
    return res.status(404).json({message:"Election not found"});
    if(!election.voters.includes(email))
    return res.status(401).json({message:"Unauthorized"});
    if(election.launched===false)
    return res.status(400).json({message:"Election is not launched yet"});
    res.status(200).json({data: election});
}

const vote = async (req, res) => {
    const {id, party_id,candidate_id} = req.body;
    const voter = await Voter.findById(id).select();
    if(!voter)
    return res.status(404).json({message: "Voter not found"});
    if(voter.voted == 1)
    return res.status(400).json({message:"Already voted"});
    
    incrementCandidateVotes(party_id, candidate_id, voter, res);
}

const addVoter = async (req, res)=>{
    const {email, name, wallet_address, election_id} = req.body;
     
    const validate = validator.validate(email); 
    if(!validate)
    return res.status(400).json({message:"Invalid input"});

    const election = await Election.findById(election_id);
    if(election.voters.includes(email)) {
        return res.status(400).json({message:"Voter is already in the election"});
    }

    // Generate a unique voter id for the voter
    const voter_id = generateVoterId();

    // Generate a unique voter key for the voter
    const voter_key = generateVoterKey();

    // Send email to voter
    const message = `You've been added as a voter to ${election.title} election which is going to start on ${election.start_time}.
    Your Id is: ${voter_id} and your key is ${voter_key}
    Election code is ${election.code}
    Don't share these information with anyone`
    await sendEmail(email, "Election Credentials", message);
    
    addNewVoter(election, email, name, voter_id, voter_key, wallet_address, election_id, res);
}

const removeVoter = async (req, res) => {
    const {voter_id, election_id} = req.body;
    removeVoterFromElection(voter_id, election_id, res);
    Voter.findByIdAndRemove(voter_id, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
    });
    res.status(200).json({message:"Voter removed successfully"});
}

const viewVoters = async (req, res) => {
    const {election_id} = req.params;
    Voter.find({election_id: election_id}, async (err, voters) => {
        if(err)
        return res.status(404).json({message:"Election not founnd"}); 
        return res.status(200).json({data: voters});
    })
}


module.exports = {
    getVoter,
    viewElectionAsVoter,
    vote,
    addVoter, 
    removeVoter,
    viewVoters
}