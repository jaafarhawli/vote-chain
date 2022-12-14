const User = require('../models/users.model');
const Election = require('../models/elections.model');

const addModerator = async (req, res) => {
    const {email, election_id, sender_email} = req.body;
    User.findOne({email: email}, async (err, user) => {
        if(err) 
        return res.status(404).json({message:"User not found"});
        if(!user)
        return res.status(404).json({message:"User not found"});
        
        // Check if the user is adding himself as moderator to his election
        if(user.elections.includes(election_id))
        return res.status(400).json({message:"Invalid request"});
        Election.findById(election_id, async (err, election) => {
            if(err) 
            return res.status(404).json({message:"Election not found"});
            
            // Check if the user is already a moderator to this election
            if(election.moderators.includes(user._id))
            return res.status(400).json({message:"This user is already a moderator to your election"});
            user.notifications.push({
                user_email: sender_email,
                election_id: election_id,
                election_title: election.title
            });
            await user.save();

            res.status(200).json({message: "Request sent successfully"});
    });
});
}

const removeModerator = async (req, res) => {
    const {moderator_id, election_id} = req.body;
    User.findById(moderator_id, (err, user) => {
        if(err)
        return res.status(404).json({message:"User not found"});
        const index = user.moderator_for.indexOf(moderator_id);  
        user.moderator_for.splice(index, 1); 
        user.save();
    })
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json({message:"Election not found"});
        const index = election.moderators.indexOf(election_id);
        election.moderators.splice(index, 1); 
        election.save();
    })
    res.status(200).json({message:"Moderator removed successfully"});
}

const viewModerators = async (req, res) => {
    const {election_id} = req.params;
    User.find({moderator_for: {"$in": [election_id]}}, async (err, moderators) => {
        if(err)
        return res.status(404).json({message:"Election not founnd"}); 
        return res.status(200).json({data: moderators});
    })
}

module.exports = {
    addModerator,
    removeModerator,
    viewModerators
}