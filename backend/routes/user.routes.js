const {Router} = require('express');
const {getUser, createElection, viewElectionsAsAdmin, viewElectionsAsModerator, editAccount, changePassword, viewElectionAsAdmin,
viewElectionAsModerator, addModerator, removeModerator, addParty, removeParty, addCandidate, removeCandidate} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { remove } = require('../models/users.model');
const router = Router();

router.get('/:email', authMiddleware, getUser);
router.post('/election', authMiddleware, createElection);
router.get('/elections/:id', authMiddleware, viewElectionsAsAdmin);
router.get('/elections/moderator/:id', authMiddleware, viewElectionsAsModerator);
router.put('/account', authMiddleware, editAccount);
router.put('/password', authMiddleware, changePassword);
router.get('/election/:user_id/:election_id', authMiddleware, viewElectionAsAdmin);
router.get('/election/moderator/:user_id/:election_id', authMiddleware, viewElectionAsModerator);
router.post('/moderator', authMiddleware, addModerator);
router.delete('/moderator', authMiddleware, removeModerator);
router.post('/party', authMiddleware, addParty);
router.delete('/party', authMiddleware, removeParty);
router.post('/candidate', authMiddleware, addCandidate);
router.delete('/candidate', authMiddleware, removeCandidate);

module.exports = router;