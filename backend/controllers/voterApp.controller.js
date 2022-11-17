const voterAccount = require('../models/voterAccounts.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Election = require('../models/elections.model');

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
      const {account_id, election_id} = req.body;
      voterAccount.findById(account_id, async (err, account) => {
          if(err)
          return res.status(400).json({message: error});
          const election = await Election.findById(election_id).select();
          if(!election)
          return res.status(400).json({message: 'Election not found'});
          await account.elections.push(election_id);
          await account.save();
          res.status(200).json({message: "Election added successfully"});
      }) 
  }

  module.exports = {
    register,
    addElection
}