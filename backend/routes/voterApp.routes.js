const {Router} = require('express');
const { register, addElection } = require('../controllers/voterApp.controller');
const router = Router();

// Register account
router.post('/register', register);

// Add election to account
router.post('/election', addElection);

module.exports = router;