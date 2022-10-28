const {Router} = require('express');
const {getUser, createElection, viewElectionsAsAdmin, viewElectionsAsModerator, editAccount, changePassword, viewElectionAsAdmin,
viewElectionAsModerator, addModerator, removeModerator, addParty, removeParty, addCandidate, removeCandidate, addVoter, removeVoter, searchModerator, searchParty, searchCandidate, searchVoter, viewModerators, viewParties, viewCandidates, viewVoters, editElection, removeElection, uploadCandidateImage} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const imageMiddleware = require('../middlewares/image.middleware');
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
router.post('/voter', authMiddleware, addVoter);
router.delete('/voter', authMiddleware, removeVoter);
router.get('/moderator/:election_id/:moderator_email', authMiddleware, searchModerator);
router.get('/party/:election_id/:party_name', authMiddleware, searchParty);
router.get('/candidate/:election_id/:candidate_name', authMiddleware, searchCandidate);
router.get('/voter/:election_id/:voter_email', authMiddleware, searchVoter);
router.get('/moderators/:election_id', authMiddleware, viewModerators);
router.get('/parties/:election_id', authMiddleware, viewParties);
router.get('/candidates/:election_id', authMiddleware, viewCandidates);
router.get('/voters/:election_id', authMiddleware, viewVoters);
router.put('/election', authMiddleware, editElection);
router.delete('/election', authMiddleware, removeElection);
router.post('/image', imageMiddleware.single('candidateImg'), uploadCandidateImage);



module.exports = router;