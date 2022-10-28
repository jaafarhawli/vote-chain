const {Router} = require('express');
const {getVoter, viewElectionAsVoter} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const router = Router();

router.get('/:voter_id', voterMiddleware, getVoter);
router.get('/election/:email/:election_id', voterMiddleware, viewElectionAsVoter);

module.exports = router;