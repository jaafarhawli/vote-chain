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
    return res.status(404).json({message:"Election not found"});
    if(!election.voters.includes(email))
    return res.status(401).json({message:"Unauthorized"});
    if(election.launched===true)
    return res.status(400).json({message:"Election is not launched yet"});
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

const addVoter = async (req, res)=>{
    const {email, name, election_id} = req.body;
     
    const validate = validator.validate(email); 
    if(!validate)
    return res.status(400).json("Invalid input");

    const election = await Election.findById(election_id);
    if(election.voters.includes(email)) {
        return res.status(400).json("Voter is already in the election");
    }

    let voter_id = Math.random().toString().slice(2,11);
    let id_exists = Election.findOne({voter_id: voter_id});
    while(id_exists.length==1) {
        voter_id = Math.random().toString().slice(2,11);
        id_exists = Election.findOne({voter_id: voter_id});
    }

    let voter_key = Math.random().toString(36).substring(2,11);
    let key_exists = Election.findOne({voter_key: voter_key});
    while(key_exists.length==1) {
        voter_key = Math.random().toString(36).substring(2,11);
        key_exists = Election.find({key_exists: voter_key});
    }
    
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

        res.status(200).json({voter});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const removeVoter = async (req, res) => {
    const {voter_id, election_id} = req.body;
    Voter.findById(voter_id, async (err, voter) => {
        if(err)
        return res.status(400).json("Invalid input");
        Election.findById(election_id, (err, election) => {
            if(err)
            return res.status(404).json("Election not found");
            const index = election.voters.indexOf(voter.email);
            election.voters.splice(index, 1); 
            election.save();
        })  })  
    Voter.findByIdAndRemove(voter_id, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
    });
    res.status(200).json("Voter removed successfully");
}


module.exports = {
    getVoter,
    viewElectionAsVoter,
    vote,
    addVoter, 
    removeVoter
}