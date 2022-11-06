const User = require('../models/users.model');
const Election = require('../models/elections.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');
const bcrypt = require('bcrypt');
var validator = require("email-validator");

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

const addModerator = async (req, res) => {
    const {email, election_id} = req.body;
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

const addCandidate = async (req, res) => {
    const {name, party_id} = req.body;
    Party.findById(party_id, async (err, party) => {
        if(err) 
        return res.status(404).json("Party not found");
        if(!party)
        return res.status(404).json("Party not found");
        const candidate = {
            name: name,
            score: 0,
            picture_url: ""
        }
        party.candidates.push(candidate);
        party.save();
        res.status(200).json("Candidate added successfully");
    });
}

const removeCandidate = async (req, res) => {
    const {candidate_id, party_id} = req.body;
    Party.findById(party_id, (err, party) => {
        if(err)
        return res.status(404).json("Party not found");
        const index = party.candidates.indexOf(candidate_id);
        party.candidates.splice(index, 1); 
        party.save();
    })
    res.status(200).json("Candidate removed successfully");
}

const addVoter = async (req, res)=>{
    const {email, name, election_id} = req.body;
     
    const validate = validator.validate(email); 
    if(!validate)
    return res.status(400).json("Invalid input");

    const election = await Election.findById(election_id);
    if(election.voters.includes(email)) {
        return res.status(400).json("Voter is already in the election");
    }

    let voter_id = Math.random().toString().slice(2,11);
    let id_exists = Election.findOne({voter_id: voter_id});
    while(id_exists.length==1) {
        voter_id = Math.random().toString().slice(2,11);
        id_exists = Election.findOne({voter_id: voter_id});
    }

    let voter_key = Math.random().toString(36).substring(2,11);
    let key_exists = Election.findOne({voter_key: voter_key});
    while(key_exists.length==1) {
        voter_key = Math.random().toString(36).substring(2,11);
        key_exists = Election.find({key_exists: voter_key});
    }
    
    try{
        const voter = new Voter();
        voter.email = email;
        voter.name = name;
        voter.voter_id = voter_id;
        voter.voter_key = voter_key;
        voter.election_id = election_id;
        voter.voted = 0;
        await voter.save();

        election.voters.push(voter.email);
        await election.save();

        res.status(200).json({voter});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const removeVoter = async (req, res) => {
    const {voter_id, election_id} = req.body;
    Voter.findByIdAndRemove(voter_id, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
    });
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json("Election not found");
        const index = election.voters.indexOf(election_id);
        election.voters.splice(index, 1); 
        election.save();
    })
    res.status(200).json("Voter removed successfully");
}

const searchModerator = async (req, res) => {
    const {election_id, moderator_email} = req.params;
    Election.findById(election_id, async(err, election) => {
        if(err)
        return res.status(404).json("Election not found");
        User.findOne({email:moderator_email}, async(err, moderator) => {
            if(err)
            return res.status(404).json("Moderator is not found");
            if(!moderator)
            return res.status(404).json("Moderator is not found");
            if(!election.moderators.includes(moderator._id))
            return res.status(404).json("Moderator is not found");
            return res.status(200).json(moderator);
        });
        return res.status(200).json(parties);
    })
}

const searchParty = async (req, res) => {
    const {election_id, party_name} = req.params;
    Election.findById(election_id, async(err) => {
        if(err)
        return res.status(404).json("Election not found");
        const parties = await Party.find({$and:[{election: election_id},{name: {$regex: party_name, $options: 'i'}}]});
        return res.status(200).json(parties);
    })
}

const viewModerators = async (req, res) => {
    const {election_id} = req.params;
    User.find({moderator_for: {"$in": [election_id]}}, async (err, moderators) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        return res.status(200).json(moderators);
    })
}

const viewParties = async (req, res) => {
    const {election_id} = req.params;
    Party.find({election: election_id}, async (err, parties) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        return res.status(200).json(parties);
    })
}

const viewCandidates = async (req, res) => {
    const {election_id} = req.params;
    Party.find({election: election_id}, async (err, parties) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        const candidates = [];
        let data = {};
            parties.forEach((party) => {
                party.candidates.forEach((candidate) => {
                    data.party = party.name;
                    data.name= candidate.name;
                    data.image = candidate.picture_url;
                    data._id = candidate._id;
                    candidates.push({
                        "party": party.name,
                        "party_id":party._id,
                        "name": candidate.name,
                        "image": candidate.picture_url,
                        "id": candidate._id,
                    });
                })
            })
            return res.status(200).json(candidates);
    })
}

const viewVoters = async (req, res) => {
    const {election_id} = req.params;
    Voter.find({election_id: election_id}, async (err, voters) => {
        if(err)
        return res.status(404).json("Election not founnd"); 
        return res.status(200).json(voters);
    })
}

const editElection = async (req, res) => {
    const {id, ...data} = req.body

    Election.findById(id, async (err) => {
        if(err) 
        return res.status(400).json("Invalid input");
        Election.findByIdAndUpdate(id,{
            title: data.title,
            start_time: data.start_time,
            end_time: data.end_time,
            timezone: data.timezone,
        }, async (err) => {
            if(err)
            return res.status(400).json("Invalid input");
            res.status(200).json("Election updated successfully");
        });
    }); 
} 

const removeElection = (req, res) => {
    const {election_id} = req.body;
    Election.findByIdAndRemove(election_id, (err) => {
        if(err)
        return res.status(400).json("Invalid input");
        Voter.deleteMany({ election_id: election_id }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
        Party.deleteMany({ election: election_id }, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
          });
        User.findOne({elections: {"$in": [election_id]}}, (err, user) => {
            if(err)
            console.log("Election not found");
    
            User.find({moderator_for: {"$in": [election_id]}}, (err, users) => {
                if(err)
                console.log("Election not found");
                if(users.length==0)
                return res.status(200).json("Election removed successfully");
                const index = user.elections.indexOf(election_id);
                user.elections.splice(index, 1); 
                user.save();
                users.forEach((user) => {
                    const index = user.moderator_for.indexOf(election_id);
                    console.log("index", index);
                    user.moderator_for.splice(index, 1); 
                    user.save();
                })
                return res.status(200).json("Election removed successfully");
            })
        })
    });
}

const uploadCandidateImage = (req, res, next) => {
    const {candidate_id, party_id} = req.body;
    const url = req.protocol + '://' + req.get('host')
    Party.findById(party_id, async (err, party) => {
        if(err)
        res.status(404).json("Party not found");
        party.candidates.forEach((candidate)=> {
            if(candidate._id == candidate_id) {
                candidate.picture_url = url + `/public/${candidate_id}` + req.file.filename;
            }
        })
        party.save().then(result => {
        res.status(201).json({
            message: "Image uploaded successfully!",    
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
    })
}

module.exports = {
    getUser,
    createElection,
    viewElectionsAsAdmin,
    viewElectionsAsModerator,
    editAccount,
    changePassword,
    deleteAccount,
    viewElectionAsAdmin,
    viewElectionAsModerator,
    addModerator,
    removeModerator,
    addParty, 
    removeParty,
    addCandidate,
    removeCandidate,
    addVoter,
    removeVoter,
    searchModerator,
    searchParty,
    searchCandidate, 
    searchVoter,
    viewModerators,
    viewParties,
    viewCandidates,
    viewVoters,
    editElection,
    removeElection,
    uploadCandidateImage
}