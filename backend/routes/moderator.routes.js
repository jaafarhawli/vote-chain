const {Router} = require('express');
const {addModerator} = require('../controllers/moderator.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/moderator', authMiddleware, adminMiddleware, addModerator);

module.exports = router;