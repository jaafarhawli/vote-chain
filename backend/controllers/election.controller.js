const {viewElectionAsModeratorResult, removeElectionFromUsers, updateElection, newElection, setLaunch, generateElectionCode, returnElectionData} = require('../utils/election.utils');

const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const createElection = async(req, res) => {
    const {admin_id, title, start_time, end_time} = req.body;
    const election_code = generateElectionCode();

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
        // Remove the election from it's users' admin and moderator_for election list
        removeElectionFromUsers(election_id, res);
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
    returnElectionData(election_id, user_id, res);
}

const viewElectionAsModerator = (req, res) => {
    const {user_id, election_id} = req.params;
    viewElectionAsModeratorResult(election_id, user_id, res);
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