const nodemailer = require("nodemailer");
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var validator = require("email-validator");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

const sendVerificationEmail = async (req, res) => {
    try {
      
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.status(400).send("User with given email already exist!");

        if(req.body.password.length < 8)
        return res.status(400).json("Invalid input");
         
        const validate = validator.validate(req.body.email); 
        if(!validate)
        return res.status(400).json("Invalid input");
  
      user = await new User({
  
        password: await bcrypt.hash(req.body.password, 10),
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        name: req.body.name,
        email: req.body.email,
      }).save();
  
      const token = jwt.sign({email: user.email}, process.env.JWT_SECRET_KEY, {
          expiresIn: '1y'
      });
  
      const message = `${process.env.BASE_URL}/email/verify/${user._id}/${token}`;
      await sendEmail(user.email, "Verify Email", message);
  
      res.send("An Email sent to your account please verify");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  };


  const verifyEmail = async (req, res) => {
    const {id, token} = req.params;
    const user = await User.findById(id).select();
    if (!user) return res.status(400).send("Invalid link");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const verifiedToken = await User.findOne({email: decoded.email}).lean();
    if(!verifiedToken) return res.status(400).send("Invalid link");

    User.findByIdAndUpdate(id,{
        verified:true
    }, async (err) => {
        if(err)
        return res.status(400).json({message:"Invalid input"});
        res.status(200).json({message:"Account updated successfully"});
    });
  };

module.exports = {
    sendEmail,
    sendVerificationEmail,
    verifyEmail
};
