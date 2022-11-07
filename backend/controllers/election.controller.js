const {viewElectionAsModeratorResult, removeElectionFromUsers, updateElection, newElection, setLaunch} = require('../utils/election.utils');

const User = require('../models/users.model');
const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const createElection = async(req, res) => {
    const {admin_id, title, start_time, end_time} = req.body;
    let election_code = Math.random().toString(36).substring(2,7);
    let code = Election.findOne({code: election_code});

    // Generate a unique random code for the election
    while(code.length==1) {
        election_code = Math.random().toString(36).substring(2,7);
        code = Election.find({code: election_code});
    }

    if(end_time-start_time<0)
    return res.status(400).json({
        message: "Election end time should be ahead of start time"
    })
    
    if(end_time-start_time<24)
    return res.status(400).json({
        message: "Election should be 24 hours atleast"
    })
    newElection(title, start_time, end_time, election_code, admin_id, res);
}

const editElection = async (req, res) => {
    const {election_id, ...data} = req.body

    if(data.end_time-data.start_time<0)
    return res.status(400).json({
        message: "Election end time should be ahead of start time"
    })
    
    if(data.end_time-data.start_time<24)
    return res.status(400).json({
        message: "Election should be 24 hours atleast"
    })

    Election.findById(election_id, async (err) => {
        if(err) 
        return res.status(400).json({message:"Invalid input"});
        updateElection(election_id, res);
    }); 
} 

const removeElection = (req, res) => {
    const {election_id} = req.body;
    // Remove election from elections collection
    Election.findByIdAndRemove(election_id, (err) => {
        if(err)
        return res.status(400).json({ err });
        // Remove all voters belonging to the election
        Voter.deleteMany({ election_id: election_id }, function (err) {
            if(err) 
            return res.status(400).json({ err });
          });
        // Remove all parties belonging to the election
        Party.deleteMany({ election: election_id }, function (err) {
            if(err) 
            return res.status(400).json({ err });
          });
        // Remove the election from it's admin election list
        User.findOne({elections: {"$in": [election_id]}}, (err, user) => {
            if(err)
            return res.status(400).json({ err });
            // Remove the election from it's users' moderator_for election list
            User.find({moderator_for: {"$in": [election_id]}}, (err, users) => {
                if(err)
                return res.status(400).json({ err });
                if(users.length==0)
                return res.status(200).json({message:"Election removed successfully"});
                removeElectionFromUsers(user, users);
                return res.status(200).json({message:"Election removed successfully"});
            })
        })
    });
}

const launchElection = async (req, res) => {
    const {election_id} = req.body

    const election = await Election.findById(election_id).populate({
        path: "parties",
      });

    const date =  new Date();
    if(date>election.start_time)
    return res.status(400).json({message:"Election has passed it's start time before being launched"});
    if(election.voters.length===0)
    return res.status(400).json({message:"Add voters before launching your election"});
    
    if(election.parties.length===0)
    return res.status(400).json({message:"Add parties before launching your election"});
    
    let candidates = 0
    for(const party of election.parties) {
        candidates+=party.candidates.length;
    }
    if(candidates===0)
    return res.status(400).json({message:"Add candidates before launching your election"});
    setLaunch(election_id, res);
} 

const viewElectionsAsAdmin = (req, res) => {
    const {id} = req.params;
    Election.find({admin: id}, (err, elections) => {
        if(err) 
        return res.status(404).json({message:"No Elections"});
        res.status(200).json({data: elections});
    });
}

const viewElectionsAsModerator = (req, res) => {
    const {id} = req.params;
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err) 
        return res.status(404).json({message:"No Elections"});
        res.status(200).json({data: elections});
    });
}

const viewElectionAsAdmin = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        return res.status(404).json({message:"Election not found"});
        if(election.admin!=user_id)
        return res.status(401).json({message:"Unauthorized"});
        res.status(200).json({data: election});
    });
}

const viewElectionAsModerator = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        return res.status(404).json({message:"Election not found"});
        if(!election.moderators.includes(user_id))
        return res.status(401).json({message:"Unauthorized"});
        const result = viewElectionAsModeratorResult(election);
        res.status(200).json({data: result});
    });
}

module.exports = {
    createElection, 
    editElection,
    removeElection,
    launchElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator,
    viewElectionAsAdmin,
    viewElectionAsModerator
}