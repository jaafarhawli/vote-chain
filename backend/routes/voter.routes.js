const {Router} = require('express');
const {getVoter, viewElectionAsVoter, vote, addVoter} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/:voter_id', voterMiddleware, getVoter);
router.get('/election/:email/:election_id', voterMiddleware, viewElectionAsVoter);
router.post('/vote', voterMiddleware, vote);
router.post('/voter', authMiddleware, launchedMiddleware, addVoter);

module.exports = router;