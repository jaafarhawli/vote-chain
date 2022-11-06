const Election = require('../models/elections.model');

const createElection = async(req, res) => {
    const {admin_id, title, start_time, end_time} = req.body;
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
        election.code = election_code;
        election.admin = admin_id;
        election.launched = false;
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

const editElection = async (req, res) => {
    const {id, ...data} = req.body

    Election.findById(election_id, async (err) => {
        if(err) 
        return res.status(400).json("Invalid input");
        Election.findByIdAndUpdate(election_id,{
            title: data.title,
            start_time: data.start_time,
            end_time: data.end_time,
            description: data.description
        }, async (err) => {
            if(err)
            return res.status(400).json("Invalid input");
            res.status(200).json("Election updated successfully");
        });
    }); 
} 

module.exports = {
    createElection, 
    editElection
}