const {Router} = require('express');
const {addParty, removeParty, viewParties} = require('../controllers/party.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

// Add party
router.post('/', authMiddleware, adminMiddleware, launchedMiddleware, addParty);

// Remove party
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeParty);

// View all parties
router.get('/:election_id', authMiddleware, viewParties);

module.exports = router;