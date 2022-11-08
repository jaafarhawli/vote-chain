const User = require('../models/users.model');

const returnUserInfo = (email, res) => {
    User.findOne({
        email: email
   }, async (err, user) => {
    if(err)
    return res.status(404).json({message:"User not found"});
    else {
        res.status(200).json({data: user});
    } 
})}





module.exports = {
    returnUserInfo
}