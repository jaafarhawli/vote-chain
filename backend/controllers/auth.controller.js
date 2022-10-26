const User = require('../models/users.model');
const Voter = require('../models/voters.model');
const Ballot = require('../models/ballots.model');
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
    const {email, password} = req.body;
    
    const voter = await Voter.findOne({email}).select("+password");

    if(!voter) return res.status(404).json({message: "Invalid Credentials"});
    
    const isMatch = await bcrypt.compare(password, voter.password);
    if(!isMatch) return res.status(404).json({message: "Invalid Credentials"});

    const token = jwt.sign({email: voter.email}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1y'
    });
    res.status(200).json(token);
}

const voterSignup = async (req, res)=>{
    const {email, password} = req.body;

    if(password.length < 8)
    return res.status(400).json("Invalid input");
     
    const validate = validator.validate(email); 
    if(!validate)
    return res.status(400).json("Invalid input");

    const ballots = Ballot.find({voters: {"$in": [email]}});
    
    try{
        const voter = new Voter();
        voter.email = email;
        voter.password = await bcrypt.hash(password, 10);
        (await ballots).forEach((ballot) => {
            let element = {
                ballot_id: ballot,
                voted: false
            }
            voter.ballots.push(element);
        });
        await voter.save();

        const token = jwt.sign({email: voter.email}, process.env.JWT_SECRET_KEY, {
            expiresIn: '1y'
        });

        res.status(200).json({voter, token});

    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


module.exports = {
    login,
    userSignup,
    voterLogin,
    voterSignup
}