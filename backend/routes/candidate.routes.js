const {Router} = require('express');
const { addCandidate, removeCandidate, viewCandidates, uploadCandidateImage } = require('../controllers/candidate.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const imageMiddleware = require('../middlewares/image.middleware');
const router = Router();

router.post('/', authMiddleware, adminMiddleware, launchedMiddleware, addCandidate);
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeCandidate);
router.get('/:election_id', authMiddleware, viewCandidates);
router.post('/image', imageMiddleware.single('candidateImg'), uploadCandidateImage);

module.exports = router;