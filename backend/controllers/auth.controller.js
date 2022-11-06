const User = require('../models/users.model');
const Voter = require('../models/voters.model');
const Election = require('../models/elections.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");

const login = async (req, res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({email}).select("+password");

    if(!user) return res.status(404).json({message: "Invalid Credentials"});
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(404).json({message: "Invalid Credentials"});

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1y'
    });
    res.status(200).json(token);
}

const userSignup = async (req, res)=>{
    const {email, password, first_name, last_name} = req.body;

    if(password.length < 8)
    return res.status(400).json("Invalid input");
     
    const validate = validator.validate(email); 
    if(!validate)
    return res.status(400).json("Invalid input");
    
    try{
        const user = new User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.first_name = first_name;
        user.last_name = last_name;
        await user.save();

        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1y'
        });

        res.status(200).json({user, token});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const voterLogin = async (req, res)=>{
    const {election_code, voter_id, voter_key} = req.body;
    
    const election_id = await Election.findOne({code: election_code}).select();
    if(!election_id)
    return res.status(404).json({message: "Invalid Credentials"});

    const voter = await Voter.findOne({$and:[{election_id:election_id}, {voter_id:voter_id}, {voter_key:voter_key}]}).select();
    if(!voter)
    return res.status(404).json({message: "Invalid Credentials"});
    
    const token = jwt.sign({voter_id: voter.voter_id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1y'
    });
    res.status(200).json(token);
}


module.exports = {
    login,
    userSignup,
    voterLogin,
}