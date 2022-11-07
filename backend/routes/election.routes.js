const {Router} = require('express');
const {createElection, editElection, removeElection, launchElection, viewElectionsAsAdmin, viewElectionsAsModerator, viewElectionAsAdmin, viewElectionAsModerator} = require('../controllers/election.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

// Create election
router.post('/', authMiddleware, createElection);

// Edit election
router.put('/', authMiddleware, adminMiddleware, launchedMiddleware, editElection);

// Remove election
router.post('/delete', authMiddleware, adminMiddleware, launchedMiddleware, removeElection);

// Launch election
router.put('/launch', authMiddleware, adminMiddleware, launchElection);

// View elections as admin
router.get('/:id', authMiddleware, viewElectionsAsAdmin);

// View elections as moderator
router.get('/moderator/:id', authMiddleware, viewElectionsAsModerator);

// View election as admin
router.get('/:user_id/:election_id', authMiddleware, viewElectionAsAdmin);

// View election as moderator
router.get('/moderator/:user_id/:election_id', authMiddleware, viewElectionAsModerator);


module.exports = router;