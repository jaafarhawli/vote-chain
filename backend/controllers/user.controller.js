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

const viewElectionsAsAdmin = (req, res) => {
    const {id} = req.params;
    Election.find({admin_id: id}, (err, elections) => {
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
        if(elections.length==0)
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

const addModerator = async (req, res) => {
    const {email, election_id} = req.body;
    User.findOne({email: email}, async (err, user) => {
        if(err) 
        return res.status(404).json("User not found");
        if(!user)
        return res.status(404).json("User not found");
        Election.findById(election_id, async (err, election) => {
            if(err) 
            return res.status(404).json("Election not found");
            if(election.moderators.includes(user._id))
            return res.status(400).json("This user is already a moderator to your election");
            user.moderator_for.push(election_id);
            await user.save();

            election.moderators.push(user._id);
            await election.save();
            res.status(200).json(user);
    });
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

const addParty = async (req, res) => {
    const {name, election_id} = req.body;

    Election.findById(election_id, (err) => {
        if(err)
        return res.status(404).json("Election not found");});

        try{
            const party = new Party();
            party.name = name;
            party.election = election_id;
            await party.save();
    
            const election = await Election.findById(election_id);
            election.parties.push(party._id);
            await election.save();
    
            res.status(200).json(party);
    
        }catch(err){
            res.status(400).json({
                message: err.message
            })
        }
}

const removeParty = async (req, res) => {
    const {party_id, election_id} = req.body;
    Party.findByIdAndRemove(party_id, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
    });
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json("Election not found");
        const index = election.parties.indexOf(election_id);
        election.parties.splice(index, 1); 
        election.save();
    })
    res.status(200).json("Party removed successfully");
}

module.exports = {
    getUser,
    createElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator,
    editAccount,
    changePassword,
    viewElectionAsAdmin,
    viewElectionAsModerator,
    addModerator,
    removeModerator,
    addParty, 
    removeParty
}