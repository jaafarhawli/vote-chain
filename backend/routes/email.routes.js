const {sendVerificationEmail} = require("../controllers/email.controller");
const express = require("express");
const router = express.Router();

router.post("/", sendVerificationEmail)


module.exports = router;
