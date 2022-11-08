const Election = require('../models/elections.model');
const User = require('../models/users.model');

const viewElectionAsModeratorResult =  (election) => {
    return result = {
        id: election._id,
        code: election.code,
        title: election.title,
        start_time: election.start_time,
        end_time: election.end_time,
        timezone: election.timezone,
        voters: election.voters
    }
}

const removeElectionFromUsers = (election_id, res) => {
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
            const index = user.elections.indexOf(election_id);
            user.elections.splice(index, 1); 
            user.save();
            users.forEach((user) => {
                const index = user.moderator_for.indexOf(election_id);
                user.moderator_for.splice(index, 1); 
                user.save();
            })
            return res.status(200).json({message:"Election removed successfully"});
        })
    })
}

const updateElection = (id, res) => {
    Election.findByIdAndUpdate(id,{
        title: data.title,
        start_time: data.start_time,
        end_time: data.end_time,
        description: data.description
    }, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
        res.status(200).json({message:"Election updated successfully"});
    });
}

const newElection = async (title, start_time, end_time, election_code, admin_id, res) => {
    try{
        const election = new Election();
        election.title = title;
        election.start_time = start_time;
        election.end_time = end_time;
        election.code = election_code;
        election.admin = admin_id;
        election.description = "";
        election.launched = false;
        await election.save();

        const admin = await User.findById(admin_id);
        admin.elections.push(election._id);
        await admin.save();

        res.status(200).json({data: election});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const setLaunch = (id, res) => {
    Election.findByIdAndUpdate(id,{
        launched: true
    }, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
        res.status(200).json({message:"Election launched successfully"});
    });
}

const generateElectionCode = () => {
    let election_code = Math.random().toString(36).substring(2,7);
    let code = Election.findOne({code: election_code});

    // Generate a unique random code for the election
    while(code.length==1) {
        election_code = Math.random().toString(36).substring(2,7);
        code = Election.findOne({code: election_code});
    }
    return election_code;
}




module.exports = {
    viewElectionAsModeratorResult,
    removeElectionFromUsers,
    updateElection,
    newElection,
    setLaunch, 
    generateElectionCode
}