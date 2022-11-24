const {Router} = require('express');
const {login, voterLogin, checkToken, checkVoterToken} = require('../controllers/auth.controller')
const router = Router();

// User login
router.post('/login/user', login);

// Voter login
router.post('/login/voter', voterLogin);

// Check token
router.post('/token', checkToken);

// Check voter token
router.post('/token/voter', checkVoterToken);


module.exports = router;