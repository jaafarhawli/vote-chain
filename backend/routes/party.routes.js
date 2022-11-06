const {Router} = require('express');
const {addParty, removeParty} = require('../controllers/party.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const { viewParties } = require('../controllers/voter.controller');
const router = Router();

router.post('/', authMiddleware, adminMiddleware, launchedMiddleware, addParty);
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeParty);
router.get('/:election_id', authMiddleware, viewParties);

module.exports = router;