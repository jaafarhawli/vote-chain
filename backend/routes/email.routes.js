const {sendVerificationEmail, verifyEmail} = require("../controllers/email.controller");
const express = require("express");
const router = express.Router();

router.post("/", sendVerificationEmail);
router.get("/verify/:id/:token", verifyEmail);

module.exports = router;
