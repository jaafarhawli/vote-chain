const Election = require('../models/elections.model');

const adminMiddleware = async (req, res, next) => {
    const {election_id, user_id} = req.body;
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json({message:"Election not found"});
        if(election.admin==user_id)
        next();
        else
        return res.status(404).json({message:"Unauthorized"});
    })

}

module.exports = adminMiddleware;