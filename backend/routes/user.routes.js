const {Router} = require('express');
const {getUser, viewElectionsAsAdmin, viewElectionsAsModerator, editAccount, changePassword, viewElectionAsAdmin,
viewElectionAsModerator, addModerator, removeModerator, addParty, removeParty, addCandidate, removeCandidate, addVoter, removeVoter, viewModerators, viewParties, viewCandidates, viewVoters, uploadCandidateImage, deleteAccount, viewNotifications, acceptRequest, rejectRequest} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const imageMiddleware = require('../middlewares/image.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.get('/:email', authMiddleware, getUser);

router.get('/elections/:id', authMiddleware, viewElectionsAsAdmin);
router.get('/elections/moderator/:id', authMiddleware, viewElectionsAsModerator);
router.put('/account', authMiddleware, editAccount);
router.put('/password', authMiddleware, changePassword);
router.get('/election/:user_id/:election_id', authMiddleware, viewElectionAsAdmin);
router.get('/election/moderator/:user_id/:election_id', authMiddleware, viewElectionAsModerator);
router.post('/moderator', authMiddleware, adminMiddleware, addModerator);
router.post('/moderator/remove', authMiddleware, adminMiddleware, removeModerator);
router.post('/party', authMiddleware, adminMiddleware, launchedMiddleware, addParty);
router.post('/party/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeParty);
router.post('/account', authMiddleware, deleteAccount);
router.post('/candidate', authMiddleware, adminMiddleware, launchedMiddleware, addCandidate);
router.post('/candidate/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeCandidate);
router.post('/voter', authMiddleware, launchedMiddleware, addVoter);
router.post('/voter/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeVoter);
router.get('/moderators/:election_id', authMiddleware, viewModerators);
router.get('/parties/:election_id', authMiddleware, viewParties);
router.get('/candidates/:election_id', authMiddleware, viewCandidates);
router.get('/voters/:election_id', authMiddleware, viewVoters);
router.post('/image', imageMiddleware.single('candidateImg'), uploadCandidateImage);
router.get('/notifications/:user_id', authMiddleware, viewNotifications);
router.post('/notifications/accept', authMiddleware, acceptRequest);
router.post('/notifications/reject', authMiddleware, rejectRequest);

module.exports = router;