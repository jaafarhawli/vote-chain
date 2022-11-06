const {Router} = require('express');
const {getVoter, viewElectionAsVoter, vote, addVoter, removeVoter, viewVoters} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = Router();

router.get('/:voter_id', voterMiddleware, getVoter);
router.get('/election/:email/:election_id', voterMiddleware, viewElectionAsVoter);
router.post('/vote', voterMiddleware, vote);
router.post('/', authMiddleware, launchedMiddleware, addVoter);
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeVoter);
router.get('/voters/:election_id', authMiddleware, viewVoters);

module.exports = router;