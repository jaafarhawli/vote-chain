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
    res.status(404).json("User not found");
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
        res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}

const viewElectionsAsModerator = (req, res) => {
    const {id} = req.params;
    Election.find({moderators: {"$in": [id]}}, (err, elections) => {
        if(err) 
        res.status(404).json("No Elections");
        if(elections.length==0)
        res.status(404).json("No Elections");
        res.status(200).json(elections);
    });
}

const editAccount = async (req, res) => {
    const {id, ...data} = req.body

    User.findById(id, (err) => {
        if(err) {
            res.status(400).json("Invalid input");
            return;
        }
    });
    
    User.findByIdAndUpdate(id,{
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
    }, async (err) => {
        if(err)
        res.status(400).json("Invalid input");
        res.status(200).json("Account updated successfully");
    });
} 

const changePassword = async (req, res) => {
    const {id, old_password, password} = req.body;

    const user = await User.findById(id).select("password");
    const isMatch = await bcrypt.compare(old_password, user.password);
    if(!isMatch) return res.status(404).json({message: "Old password is invalid"});
    
    if(password.length<8) {
        res.status(400).json("Invalid password");
        return;
    }
    hashed = await bcrypt.hash(password, 10);
    User.findByIdAndUpdate(id,{
        password: hashed
    }, async (err) => {
        if(err)
        res.status(400).json("Invalid password");
        res.status(200).json("Password updated successfully");
    });
}

const viewElectionAsAdmin = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        res.status(404).json("Election not found");
        if(election.admin!=user_id)
        res.status(401).json("Unauthorized");
        res.status(200).json(election);
    });
}

const viewElectionAsModerator = (req, res) => {
    const {user_id, election_id} = req.params;
    Election.findById(election_id, (err, election) => {
        if(err) 
        res.status(404).json("Election not found");
        if(!election.moderators.includes(user_id))
        res.status(401).json("Unauthorized");
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


module.exports = {
    getUser,
    createElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator,
    editAccount,
    changePassword,
    viewElectionAsAdmin,
    viewElectionAsModerator
}