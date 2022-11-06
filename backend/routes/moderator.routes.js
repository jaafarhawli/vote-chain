const {Router} = require('express');
const {addModerator, removeModerator} = require('../controllers/moderator.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const launchedMiddleware = require('../middlewares/launched.middleware');
const router = Router();

router.post('/', authMiddleware, adminMiddleware, addModerator);
router.post('/remove', authMiddleware, adminMiddleware, removeModerator);

module.exports = router;