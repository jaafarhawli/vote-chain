const {Router} = require('express');
const {getVoter, viewElectionAsVoter, vote, viewParties, viewCandidates} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const router = Router();

router.get('/:voter_id', voterMiddleware, getVoter);
router.get('/election/:email/:election_id', voterMiddleware, viewElectionAsVoter);
router.post('/vote', voterMiddleware, vote);
router.get('/parties/:election_id', voterMiddleware, viewParties);
router.get('/candidates/:party_id', voterMiddleware, viewCandidates);

module.exports = router;