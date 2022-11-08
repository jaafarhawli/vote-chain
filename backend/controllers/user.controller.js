const {returnUserInfo, updateUser} = require('../utils/user.utils');

const User = require('../models/users.model');
const Election = require('../models/elections.model');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    const {email} = req.params;
    returnUserInfo(email, res)
};

const editAccount = async (req, res) => {
    const {id, ...data} = req.body

    User.findById(id, (err) => {
        if(err) 
        return res.status(400).json({message: "Invalid input"});
    });  
    updateUser(id, data.first_name, data.last_name, data.email, res);
} 

const changePassword = async (req, res) => {
    const {id, old_password, password} = req.body;

    const user = await User.findById(id).select("password");
    const isMatch = await bcrypt.compare(old_password, user.password);
    if(!isMatch) return res.status(404).json({message: "Old password is invalid"});
    
    if(password.length<8) 
    return res.status(400).json({message:"Invalid password"});

    hashed = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(id,{
        password: hashed
    }, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid password"});
        res.status(200).json({message:"Password updated successfully"});
    });
}

const deleteAccount = (req, res) => {
    const {id} = req.body;
    Election.deleteMany({ admin: id }, function (err) {
        if(err) 
        return res.status(400).json({ err });
      });
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
    
    User.findByIdAndDelete(id, (err) => {
        if(err)
        return res.status(400).json({ err });
    });
    return res.status(200).json({message: 'User deleted successfully'});
}

const viewNotifications = async (req, res) => {
    const {user_id} = req.params;
    User.findById(user_id, async (err, user) => {
        if(err)
        return res.status(404).json({message:"Election not founnd"}); 
        return res.status(200).json({data: user.notifications});
    })
}

const acceptRequest = async (req, res) => {
    const {user_id, election_id} = req.body;
    User.findById(user_id, async (err, user) => {
        if(err) 
        return res.status(404).json({message:"User not found"});
        if(!user)
        return res.status(404).json({message:"User not found"});
        if(user.elections.includes(election_id))
        return res.status(400).json({message:"Invalid request"});
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
});
}

const rejectRequest = async (req, res) => {
    const {user_id, election_id} = req.body;
    try {
    await User.updateOne({"_id": user_id}, {"$pull": {
        "notifications": {"election_id": election_id}
    }})
    return res.status(200).json({message: "Request rejected"});
    } catch (err) {
        return res.status(500).json({ err });
    }
}

module.exports = {
    getUser,
    editAccount,
    changePassword,
    deleteAccount,
    viewNotifications, 
    acceptRequest,
    rejectRequest
}