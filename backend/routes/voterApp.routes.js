const {Router} = require('express');
const { register, addElection, viewAccountElections } = require('../controllers/voterApp.controller');
const router = Router();

// Register account
router.post('/register', register);

// Add election to account
router.post('/election', addElection);

// View account elections
router.get('/:account_id', viewAccountElections);

module.exports = router;