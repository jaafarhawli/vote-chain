const jwt = require('jsonwebtoken');
const Voter = require('../models/voters.model');

// Check if voter token is valid
const voterMiddleware = async (req, res, next) => {
    if(!req.headers.authorization)
    return res.status(401).json({message: "Unauthorized"})
    const token = req.headers.authorization.split(" ")[1];

    if(!token) return res.status(401).json({message: "Unauthorized"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const voter = await Voter.findOne({voter_id: decoded.voter_id}).lean();
        req.voter = {...voter};
        next()

    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }

}

module.exports = voterMiddleware;