const Party = require('../models/parties.model');
const Election = require('../models/elections.model');
const User = require('../models/users.model');

const addModerator = async (req, res) => {
    const {email, election_id, sender_email} = req.body;
    User.findOne({email: email}, async (err, user) => {
        if(err) 
        return res.status(404).json("User not found");
        if(!user)
        return res.status(404).json("User not found");
        if(user.elections.includes(election_id))
        return res.status(400).json("Invalid request");
        Election.findById(election_id, async (err, election) => {
            if(err) 
            return res.status(404).json("Election not found");
            if(election.moderators.includes(user._id))
            return res.status(400).json("This user is already a moderator to your election");
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

module.exports = {
    addModerator
}