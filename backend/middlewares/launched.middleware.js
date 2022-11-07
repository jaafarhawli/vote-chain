const Election = require('../models/elections.model');

// Check if election is launched
// Some operations can't be performed anymore by the admin after launching the election
const launchedMiddleware = async (req, res, next) => {
    const {election_id} = req.body;
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json({message:"Election not found"});
        if(election.launched===false)
        next();
        else
        return res.status(404).json({message:"Election is launched"});
    })

}

module.exports = launchedMiddleware;