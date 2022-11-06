const {Router} = require('express');
const {createElection, editElection, removeElection, launchElection} = require('../controllers/election.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/', authMiddleware, createElection);
router.put('/', authMiddleware, adminMiddleware, launchedMiddleware, editElection);
router.post('/delete', authMiddleware, adminMiddleware, launchedMiddleware, removeElection);
router.put('/launch', authMiddleware, adminMiddleware, launchedMiddleware, launchElection);

module.exports = router;