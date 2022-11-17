const {Router} = require('express');
const { register } = require('../controllers/voterApp.controller');
const router = Router();

// Register account
router.post('/register', register);

module.exports = router;