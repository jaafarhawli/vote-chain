const {Router} = require('express');
const {viewPartiesVoteCount, viewCandidatesVoteCount, viewPartyCandidates} = require('../controllers/statistics.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/parties/:election_id', authMiddleware, viewPartiesVoteCount);
router.get('/candidates/:election_id', authMiddleware, viewCandidatesVoteCount);
router.get('/party/candidates/:election_id', authMiddleware, viewPartyCandidates);

module.exports = router;