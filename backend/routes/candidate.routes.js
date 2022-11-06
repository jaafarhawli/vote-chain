const {Router} = require('express');
const { addCandidate, removeCandidate, viewCandidates } = require('../controllers/candidate.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/candidate', authMiddleware, adminMiddleware, launchedMiddleware, addCandidate);
router.post('/candidate/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeCandidate);
router.get('/candidates/:election_id', authMiddleware, viewCandidates);

module.exports = router;