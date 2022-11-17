const {Router} = require('express');
const {login, voterLogin, voterAccountLogin} = require('../controllers/auth.controller')
const router = Router();

// User login
router.post('/login/user', login);

// Voter login
router.post('/login/voter', voterLogin);

// Voter account Login (on phone app)
router.post('/login/account', voterAccountLogin);


module.exports = router;