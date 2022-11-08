const {Router} = require('express');
const {viewPartiesVoteCount} = require('../controllers/statistics.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/:election_id', authMiddleware, viewPartiesVoteCount);

module.exports = router;