const {Router} = require('express');
const {login, voterLogin} = require('../controllers/auth.controller')
const router = Router();

// User login
router.post('/login/user', login);

// Voter login
router.post('/login/voter', voterLogin);


module.exports = router;