const {Router} = require('express');
const {addModerator, removeModerator, viewModerators} = require('../controllers/moderator.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = Router();

// Add moderator
router.post('/', authMiddleware, adminMiddleware, addModerator);

// Remove moderator
router.post('/remove', authMiddleware, adminMiddleware, removeModerator);

// View all moderators
router.get('/:election_id', authMiddleware, viewModerators);

module.exports = router;