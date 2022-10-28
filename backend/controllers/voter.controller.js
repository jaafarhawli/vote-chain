const User = require('../models/users.model');
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
    // Election.findById(election_id, (err, election) => {
    //     if(err) 
    //     return res.status(404).json("Election not found");
        
    // });
    const election = await Election.findById(election_id).select("-admin -moderators");
    if(!election)
    return res.status(404).json("Election not found");
    if(!election.voters.includes(email))
    return res.status(401).json("Unauthorized");
    res.status(200).json(election);
}


module.exports = {
    getVoter,
    viewElectionAsVoter
}