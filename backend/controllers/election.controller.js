const User = require('../models/users.model');
const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const createElection = async(req, res) => {
    const {admin_id, title, start_time, end_time} = req.body;
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
        election.code = election_code;
        election.admin = admin_id;
        election.launched = false;
        await election.save();

        const admin = await User.findById(admin_id);
        admin.elections.push(election._id);
        await admin.save();

        res.status(200).json(election);

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const editElection = async (req, res) => {
    const {id, ...data} = req.body

    Election.findById(election_id, async (err) => {
        if(err) 
        return res.status(400).json("Invalid input");
        Election.findByIdAndUpdate(election_id,{
            title: data.title,
            start_time: data.start_time,
            end_time: data.end_time,
            description: data.description
        }, async (err) => {
            if(err)
            return res.status(400).json("Invalid input");
            res.status(200).json("Election updated successfully");
        });
    }); 
} 

const removeElection = (req, res) => {
    const {election_id} = req.body;
    Election.findByIdAndRemove(election_id, (err) => {
        if(err)
        return res.status(400).json("Invalid input");
        Voter.deleteMany({ election_id: election_id }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
        Party.deleteMany({ election: election_id }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
        User.findOne({elections: {"$in": [election_id]}}, (err, user) => {
            if(err)
            console.log("Election not found");
    
            User.find({moderator_for: {"$in": [election_id]}}, (err, users) => {
                if(err)
                console.log("Election not found");
                if(users.length==0)
                return res.status(200).json("Election removed successfully");
                const index = user.elections.indexOf(election_id);
                user.elections.splice(index, 1); 
                user.save();
                users.forEach((user) => {
                    const index = user.moderator_for.indexOf(election_id);
                    console.log("index", index);
                    user.moderator_for.splice(index, 1); 
                    user.save();
                })
                return res.status(200).json("Election removed successfully");
            })
        })
    });
}

const launchElection = async (req, res) => {
    const {election_id} = req.body

    Election.findById(election_id, async (err, election) => {
        if(err) 
        return res.status(400).json({message:"Invalid input"});
        const date =  new Date();
        if(date>election.start_time)
        return res.status(400).json({message:"Election has passed it's start time before being launched"});
        Election.findByIdAndUpdate(election_id,{
            launched: true
        }, async (err) => {
            if(err)
            return res.status(400).json("Invalid input");
            res.status(200).json({message:"Election launched successfully"});
        });
    }); 
} 

const viewElectionsAsAdmin = (req, res) => {
    const {id} = req.params;
    Election.find({admin: id}, (err, elections) => {
        if(err) 
        return res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}

const viewElectionsAsModerator = (req, res) => {
    const {id} = req.params;
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err) 
        return res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}

module.exports = {
    createElection, 
    editElection,
    removeElection,
    launchElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator

}