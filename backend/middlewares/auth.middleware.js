const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const authMiddleware = async (req, res, next) => {
    if(!req.headers.authorization)
    return res.status(401).json({message: "Unauthorized"})
    const token = req.headers.authorization.split(" ")[1];

    if(!token) return res.status(401).json({message: "Unauthorized"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({email: decoded.email}).lean();
        req.user = {...user};
        next()

    }catch(err){
        return res.status(401).json({message: "Unauthorized"})
    }

}

module.exports = authMiddleware;