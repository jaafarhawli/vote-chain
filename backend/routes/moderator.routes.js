const {Router} = require('express');
const {addModerator, removeModerator, viewModerators} = require('../controllers/moderator.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = Router();

router.post('/', authMiddleware, adminMiddleware, addModerator);
router.post('/remove', authMiddleware, adminMiddleware, removeModerator);
router.get('/:election_id', authMiddleware, viewModerators);

module.exports = router;