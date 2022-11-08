const {Router} = require('express');
const {viewPartiesVoteCount, viewCandidatesVoteCount, viewPartyCandidates, viewElectionNumerics, viewVotingPercentage} = require('../controllers/statistics.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/parties/:election_id', authMiddleware, viewPartiesVoteCount);
router.get('/candidates/:election_id', authMiddleware, viewCandidatesVoteCount);
router.get('/party/candidates/:election_id', authMiddleware, viewPartyCandidates);
router.get('/:election_id', authMiddleware, viewElectionNumerics);
router.get('/vote/:election_id', authMiddleware, viewVotingPercentage);

module.exports = router;