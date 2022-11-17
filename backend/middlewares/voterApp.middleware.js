const jwt = require('jsonwebtoken');
const VoterAccount = require('../models/voterAccounts.model');

// Check if user token is valid
const accountMiddleware = async (req, res, next) => {
    if(!req.headers.authorization)
    return res.status(401).json({message: "Unauthorized"})
    const token = req.headers.authorization.split(" ")[1];

    if(!token) return res.status(401).json({message: "Unauthorized"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const account = await VoterAccount.findOne({username: decoded.username}).lean();
        req.account = {...account};
        next()

    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }

}

module.exports = accountMiddleware;