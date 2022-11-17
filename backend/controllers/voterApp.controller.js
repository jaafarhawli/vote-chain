const voterAccount = require('../models/voterAccounts.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Voter = require('../models/voters.model');

const register = async (req, res) => {
    try {
      
      let account = await voterAccount.findOne({ username: req.body.username });
      if (account)
        return res.status(400).json({message: "This username is taken!"});

        if(req.body.password.length < 8)
        return res.status(400).json({message:"Password should be 8 characters atleast"});
  
      account = await new voterAccount({
  
        password: await bcrypt.hash(req.body.password, 10),
        username: req.body.username,
      }).save();
  
      const token = jwt.sign({username: voterAccount.username}, process.env.JWT_SECRET_KEY, {
          expiresIn: '1y'
      });

      res.status(200).json({data: token});

    } catch (error) {
      res.status(400).json({message:"An error occured"});
    }
  };

  const addElection = async (req, res) => {
      const {account_id, voter_id, election_id} = req.body;
      voterAccount.findById(account_id, async (err, account) => {
          if(err)
          return res.status(400).json({message: error});
          const voter = await Voter.findById(voter_id).select();
          res.status(200).json(voter);
          if(!voter)
          return res.status(400).json({message: 'Voter is not found'});
          if(voter.election_id != election_id)
          return res.status(400).json({message: 'Election is not found'});         
          await account.elections.push({
            election_id: election_id,
            voter_id: voter_id
          });
          await account.save();
          res.status(200).json({message: "Election added successfully"});
      }) 
  }

  const viewAccountElections = async (req, res) => {
      const {account_id} = req.params;
      const account = await voterAccount.findById(account_id).populate('elections.election_id');
      if(!account)
      return res.status(400).json({message: 'Account is not found'});
      const elections = [];
      for (let election of account.elections) {
        elections.push({
            election_id: election.election_id._id,
            election_title: election.election_id.title,
            voter_id: election.voter_id   
        })
      }
    res.status(200).json({data: elections});
    }

  module.exports = {
    register,
    addElection,
    viewAccountElections
}