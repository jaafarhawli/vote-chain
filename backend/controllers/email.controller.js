const nodemailer = require("nodemailer");
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
  
      const message = `${process.env.BASE_URL}/user/verify/${user._id}/${token}`;
      await sendEmail(user.email, "Verify Email", message);
  
      res.send("An Email sent to your account please verify");
    } catch (error) {
      res.status(400).send("An error occured");
    }
  };


module.exports = {
    sendEmail,
    sendVerificationEmail
};
