const {Router} = require('express');
const {getVoter, viewElectionAsVoter, vote, addVoter, removeVoter, viewVoters, applyToElection, checkElection} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = Router();

// Get voter info
router.get('/:voter_id', voterMiddleware, getVoter);

// View election as voter
router.get('/election/:email/:election_id', voterMiddleware, viewElectionAsVoter);

// Vote to candidate
router.post('/vote', voterMiddleware, vote);

// Add voter
router.post('/', authMiddleware, launchedMiddleware, addVoter);

// Remove voter
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeVoter);

// View voters
router.get('/voters/:election_id', authMiddleware, viewVoters);

// Apply to election
router.post('/apply', applyToElection);

// Check election
router.get('/election/:election_code', checkElection);


module.exports = router;