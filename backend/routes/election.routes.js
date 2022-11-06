const {Router} = require('express');
const {createElection, editElection, removeElection, launchElection, viewElectionsAsAdmin, viewElectionsAsModerator, viewElectionAsAdmin, viewElectionAsModerator} = require('../controllers/election.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/', authMiddleware, createElection);
router.put('/', authMiddleware, adminMiddleware, launchedMiddleware, editElection);
router.post('/delete', authMiddleware, adminMiddleware, launchedMiddleware, removeElection);
router.put('/launch', authMiddleware, adminMiddleware, launchedMiddleware, launchElection);
router.get('/elections/:id', authMiddleware, viewElectionsAsAdmin);
router.get('/elections/moderator/:id', authMiddleware, viewElectionsAsModerator);
router.get('/election/:user_id/:election_id', authMiddleware, viewElectionAsAdmin);
router.get('/election/moderator/:user_id/:election_id', authMiddleware, viewElectionAsModerator);

module.exports = router;