const {Router} = require('express');
const {login, userSignup} = require('../controllers/auth.controller')
const router = Router();

router.post('/login', login);
router.post('/signup/user', userSignup);

module.exports = router;