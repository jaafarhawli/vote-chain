const User = require('../models/users.model');
const Election = require('../models/elections.model');
const bcrypt = require('bcrypt');

const returnUserInfo = (email, res) => {
    User.findOne({
        email: email
   }, async (err, user) => {
    if(err)
    return res.status(404).json({message:"User not found"});
    else {
        res.status(200).json({data: user});
    } 
})}

const updateUser = (id, first_name, last_name, email, res) => {
    User.findByIdAndUpdate(id,{
        first_name: first_name,
        last_name: last_name,
        email: email,
    }, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
        res.status(200).json({message:"Account updated successfully"});
    });
}

const updateUserPassword = async (id, password, res) => {
    hashed = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(id,{
        password: hashed
    }, (err) => {
        if(err) 
        return res.status(400).json({message:"Invalid password"});

        res.status(200).json({message:"Password updated successfully"});
    });
}

removeModeratorFromElections = (id, res) => {
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err)
        return res.status(400).json({ err });
        elections.forEach((election) => {
            const index = election.moderators.indexOf(id);
            console.log("index", index);
            election.moderators.splice(index, 1); 
            election.save();
        })
    })
}

const addModeratorToElection = async (election_id, user_id, user, res) => {
    Election.findById(election_id, async (err, election) => {
        if(err) 
        return res.status(404).json({message:"Election not found"});
        if(election.moderators.includes(user_id))
        return res.status(400).json({message:"You are already a moderator to this election"});
        user.moderator_for.push(election_id);
        await user.save();

        election.moderators.push(user._id);
        await election.save();

        await User.updateOne({"_id": user_id}, {"$pull": {
            "notifications": {"election_id": election_id}
        }})
        res.status(200).json({message: "Request accepted"});
});
}


module.exports = {
    returnUserInfo,
    updateUser,
    updateUserPassword,
    removeModeratorFromElections,
    addModeratorToElection
}