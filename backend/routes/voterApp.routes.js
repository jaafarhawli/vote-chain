const {Router} = require('express');
const { register, addElection, viewAccountElections, checkToken } = require('../controllers/voterApp.controller');
const accountMiddleware = require('../middlewares/voterApp.middleware');
const router = Router();

// Register account
router.post('/register', register);

// Add election to account
router.post('/election', accountMiddleware, addElection);

// View account elections
router.get('/:account_id', accountMiddleware, viewAccountElections);

// Check user token
router.post('/token', checkToken);

module.exports = router;