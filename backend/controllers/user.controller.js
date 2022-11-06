const User = require('../models/users.model');
const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    const {email} = req.params;
    User.findOne({
        email: email
   }, async (err, user) => {
    if(err)
    return res.status(404).json("User not found");
    else {
        res.status(200).json(user);
    } 
})};

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

const editAccount = async (req, res) => {
    const {id, ...data} = req.body

    User.findById(id, (err) => {
        if(err) 
        return res.status(400).json("Invalid input");
    });
    
    User.findByIdAndUpdate(id,{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
    }, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
        res.status(200).json("Account updated successfully");
    });
} 

const changePassword = async (req, res) => {
    const {id, old_password, password} = req.body;

    const user = await User.findById(id).select("password");
    const isMatch = await bcrypt.compare(old_password, user.password);
    if(!isMatch) return res.status(404).json({message: "Old password is invalid"});
    
    if(password.length<8) 
    return res.status(400).json("Invalid password");

    hashed = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(id,{
        password: hashed
    }, async (err) => {
        if(err)
        return res.status(400).json("Invalid password");
        res.status(200).json("Password updated successfully");
    });
}

const deleteAccount = (req, res) => {
    const {id} = req.body;
    Election.deleteMany({ admin: id }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err)
        return res.status(400).json("Invalid request");
        elections.forEach((election) => {
            const index = election.moderators.indexOf(id);
            console.log("index", index);
            election.moderators.splice(index, 1); 
            election.save();
        })
    })
    
    User.findByIdAndDelete(id, (err) => {
        if(err)
        return res.status(400).json("Invalid request");
    });
    return res.status(200).json('User deleted successfully');
}

const viewElectionAsAdmin = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        return res.status(404).json("Election not found");
        if(election.admin!=user_id)
        return res.status(401).json("Unauthorized");
        res.status(200).json(election);
    });
}

const viewElectionAsModerator = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        return res.status(404).json("Election not found");
        if(!election.moderators.includes(user_id))
        return res.status(401).json("Unauthorized");
        const result = {
            id: election._id,
            code: election.code,
            title: election.title,
            start_time: election.start_time,
            end_time: election.end_time,
            timezone: election.timezone,
            voters: election.voters
        }
        res.status(200).json(result);
    });
}

const removeModerator = async (req, res) => {
    const {moderator_id, election_id} = req.body;
    User.findById(moderator_id, (err, user) => {
        if(err)
        return res.status(404).json("User not found");
        const index = user.moderator_for.indexOf(moderator_id);  
        user.moderator_for.splice(index, 1); 
        user.save();
    })
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json("Election not found");
        const index = election.moderators.indexOf(election_id);
        election.moderators.splice(index, 1); 
        election.save();
    })
    res.status(200).json("Moderator removed successfully");
}

const viewModerators = async (req, res) => {
    const {election_id} = req.params;
    User.find({moderator_for: {"$in": [election_id]}}, async (err, moderators) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        return res.status(200).json(moderators);
    })
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
        return res.status(404).json("User not found");
        if(!user)
        return res.status(404).json("User not found");
        if(user.elections.includes(election_id))
        return res.status(400).json("Invalid request");
        Election.findById(election_id, async (err, election) => {
            if(err) 
            return res.status(404).json("Election not found");
            if(election.moderators.includes(user_id))
            return res.status(400).json("You are already a moderator to this election");
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
    viewElectionsAsAdmin,
    viewElectionsAsModerator,
    editAccount,
    changePassword,
    deleteAccount,
    viewElectionAsAdmin,
    viewElectionAsModerator,
    addModerator,
    removeModerator,
    viewModerators,
    viewNotifications, 
    acceptRequest,
    rejectRequest
}