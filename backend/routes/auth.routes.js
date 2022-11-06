const {Router} = require('express');
const {login, userSignup, voterLogin} = require('../controllers/auth.controller')
const router = Router();

router.post('/login/user', login);
router.post('/signup/user', userSignup);

router.post('/login/voter', voterLogin);

module.exports = router;