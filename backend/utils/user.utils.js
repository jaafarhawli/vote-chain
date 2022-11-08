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

const updateUser = (id, first_name, last_name, email, res) => {
    User.findByIdAndUpdate(id,{
        first_name: first_name,
        last_name: last_name,
        email: email,
    }, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
        res.status(200).json({message:"Account updated successfully"});
    });
}



module.exports = {
    returnUserInfo,
    updateUser
}