const {Router} = require('express');
const {getUser, createElection, viewElectionsAsAdmin, viewElectionsAsModerator, editAccount, changePassword, viewElectionAsAdmin,
viewElectionAsModerator, addModerator, removeModerator, addParty, removeParty, addCandidate, removeCandidate, addVoter, removeVoter, viewModerators, viewParties, viewCandidates, viewVoters, editElection, removeElection, uploadCandidateImage, deleteAccount, launchElection} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const imageMiddleware = require('../middlewares/image.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.get('/:email', authMiddleware, getUser);
router.post('/election', authMiddleware, createElection);
router.get('/elections/:id', authMiddleware, viewElectionsAsAdmin);
router.get('/elections/moderator/:id', authMiddleware, viewElectionsAsModerator);
router.put('/account', authMiddleware, editAccount);
router.put('/password', authMiddleware, changePassword);
router.get('/election/:user_id/:election_id', authMiddleware, viewElectionAsAdmin);
router.get('/election/moderator/:user_id/:election_id', authMiddleware, viewElectionAsModerator);
router.post('/moderator', authMiddleware, adminMiddleware, addModerator);
router.post('/moderator/remove', authMiddleware, adminMiddleware, removeModerator);
router.post('/party', authMiddleware, adminMiddleware, addParty);
router.post('/party/remove', authMiddleware, adminMiddleware, removeParty);
router.post('/account', authMiddleware, deleteAccount);
router.post('/candidate', authMiddleware, adminMiddleware, addCandidate);
router.post('/candidate/remove', authMiddleware, adminMiddleware, removeCandidate);
router.post('/voter', authMiddleware, addVoter);
router.post('/voter/remove', authMiddleware, adminMiddleware, removeVoter);
router.get('/moderators/:election_id', authMiddleware, viewModerators);
router.get('/parties/:election_id', authMiddleware, viewParties);
router.get('/candidates/:election_id', authMiddleware, viewCandidates);
router.get('/voters/:election_id', authMiddleware, viewVoters);
router.put('/election', authMiddleware, adminMiddleware, editElection);
router.post('/election/delete', authMiddleware, adminMiddleware, removeElection);
router.post('/image', imageMiddleware.single('candidateImg'), uploadCandidateImage);
router.put('/election/launch', authMiddleware, adminMiddleware, launchedMiddleware, launchElection);



module.exports = router;