const {Router} = require('express');
const {getUser, viewElectionsAsAdmin, viewElectionsAsModerator, editAccount, changePassword, viewElectionAsAdmin,
viewElectionAsModerator, addModerator, removeModerator, removeVoter, viewModerators, viewCandidates, viewVoters, deleteAccount, viewNotifications, acceptRequest, rejectRequest} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
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
router.post('/account', authMiddleware, deleteAccount);
router.post('/voter/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeVoter);
router.get('/moderators/:election_id', authMiddleware, viewModerators);
router.get('/voters/:election_id', authMiddleware, viewVoters);
router.get('/notifications/:user_id', authMiddleware, viewNotifications);
router.post('/notifications/accept', authMiddleware, acceptRequest);
router.post('/notifications/reject', authMiddleware, rejectRequest);

module.exports = router;