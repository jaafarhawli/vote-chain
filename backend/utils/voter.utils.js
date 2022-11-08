const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const incrementCandidateVotes = async (party_id, candidate_id, voter, res) => {
    const party = await Party.findOne({_id: party_id}).select();
    if(!party)
    return res.status(404).json({message:"Party not found"});
    Election.findById(party.election, (err, election) => {
        if(err)
        return res.status(404).json({ err });
        if(election.launched===false)
        return res.status(404).json({message: "Election is not launched yet" });
    })
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

const addNewVoter = async (election, email, name, voter_id, voter_key, election_id, res) => {
    try{
        const voter = new Voter();
        voter.email = email;
        voter.name = name;
        voter.voter_id = voter_id;
        voter.voter_key = voter_key;
        voter.election_id = election_id;
        voter.voted = 0;
        await voter.save();

        election.voters.push(voter.email);
        await election.save();

        res.status(200).json({data: voter});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const removeVoterFromElection = (voter_id, election_id, res) => {
    Voter.findById(voter_id, async (err, voter) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
        Election.findById(election_id, (err, election) => {
            if(err)
            return res.status(404).json({message:"Election not found"});
            const index = election.voters.indexOf(voter.email);
            election.voters.splice(index, 1); 
            election.save();
        }) }) 
}


module.exports = {
    incrementCandidateVotes,
    generateVoterId, 
    generateVoterKey,
    addNewVoter,
    removeVoterFromElection
}