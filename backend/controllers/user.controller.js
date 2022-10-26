const User = require('../models/users.model');
const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const getUser = async (req, res) => {
    const {email} = req.params;
    User.findOne({
        email: email
   }, async (err, user) => {
    if(err)
    res.status(404).json("user not found");
    else {
        res.status(200).json(user);
    } 
})};

const createElection = async(req, res) => {
    const {admin_id, title, start_time, end_time, timezone} = req.body;
    let election_code = Math.random().toString(36).substring(2,7);
    let code = Election.findOne({code: election_code});

    while(code.length==1) {
        election_code = Math.random().toString(36).substring(2,7);
        code = Election.find({code: election_code});
    }

    try{
        const election = new Election();
        election.title = title;
        election.start_time = start_time;
        election.end_time = end_time;
        election.timezone = timezone;
        election.code = election_code;
        election.admin = admin_id;
        await election.save();

        res.status(200).json(election);

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const viewElectionsAsAdmin = (req, res) => {
    const {id} = req.params;
    Election.find({admin_id: id}, (err, elections) => {
        if(err) 
        res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}

const viewElectionsAsModerator = (req, res) => {
    const {id} = req.params;
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err) 
        res.status(404).json("No Elections");
        if(elections.length==0)
        res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}


module.exports = {
    getUser,
    createElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator
}