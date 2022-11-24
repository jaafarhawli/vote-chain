const User = require('../models/users.model');
const Voter = require('../models/voters.model');
const Election = require('../models/elections.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res)=>{
    const {email, password} = req.body;
    
    const user = await User.findOne({email}).select("+password");

    if(!user) return res.status(404).json({message: "Invalid Credentials"});
    
    if(!user.verified) return res.status(404).json({message: "Verify your email"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(404).json({message: "Invalid Credentials"});

    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1y'
    });
    res.status(200).json(token);
}

const voterLogin = async (req, res)=>{
    const {election_code, voter_id, voter_key} = req.body;
    
    const election_id = await Election.findOne({code: election_code}).select();
    if(!election_id)
    return res.status(404).json({message: "Invalid Credentials"});

    if(election_id.launched===false)
    return res.status(404).json({message: "Election is not launched yet"});

    const voter = await Voter.findOne({$and:[{election_id:election_id}, {voter_id:voter_id}, {voter_key:voter_key}]}).select();
    if(!voter)
    return res.status(404).json({message: "Invalid Credentials"});
    
    const token = jwt.sign({voter_id: voter.voter_id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1y'
    });
    res.status(200).json(token);
}

const checkToken = async (req, res) => {
    const {token} = req.body;
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findOne({email: decoded.email}).lean();
      return res.status(200).json({data: user});
    } catch(err){
      return res.status(401).json({message: "Unauthorized"})
    }
  }

  const checkVoterToken = async (req, res) => {
    const {token} = req.body;
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const voter = await Voter.findOne({voter_id: decoded.voter_id}).lean();
      return res.status(200).json({data: voter});
    } catch(err){
      return res.status(401).json({message: "Unauthorized"})
    }
  }


module.exports = {
    login,
    voterLogin,
    checkToken,
    checkVoterToken
}