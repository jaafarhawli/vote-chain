const {Router} = require('express');
const {login, userSignup, voterLogin} = require('../controllers/auth.controller')
const router = Router();

// User login
router.post('/login/user', login);

// User signup
router.post('/signup/user', userSignup);

// Voter login
router.post('/login/voter', voterLogin);


module.exports = router;