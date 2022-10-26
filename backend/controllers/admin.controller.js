const User = require('../models/users.model');
const Ballot = require('../models/ballots.model');
const Voter = require('../models/voters.model');
const Party = require('../models/parties.model');

const getUser = async (req, res) => {
    const {email} = req.params;
    User.findOne({
        email: email
   }, async (err, user) => {
    if(err)
    res.status(404).json("user not found");
    else {
        res.status(200).json(user);
    } 
})}

module.exports = {
    getUser
}