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

module.exports = {
    returnUserInfo,
    updateUser,
    updateUserPassword,
    removeModeratorFromElections
}