const voterAccount = require('../models/voterAccounts.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  module.exports = {
    register
}