const {Router} = require('express');
const {addParty, removeParty} = require('../controllers/party.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/', authMiddleware, adminMiddleware, launchedMiddleware, addParty);
router.post('/remove', authMiddleware, adminMiddleware, launchedMiddleware, removeParty);

module.exports = router;