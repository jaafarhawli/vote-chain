const Election = require('../models/elections.model');

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

const removeElectionFromUsers = (user, users) => {
    const index = user.elections.indexOf(election_id);
        user.elections.splice(index, 1); 
        user.save();
        users.forEach((user) => {
            const index = user.moderator_for.indexOf(election_id);
            user.moderator_for.splice(index, 1); 
            user.save();
        })
}

const updateElection = (id) => {
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

const newElection = async (title, start_time, end_time, election_code, admin_id) => {
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




module.exports = {
    viewElectionAsModeratorResult,
    removeElectionFromUsers,
    updateElection,
    newElection
}