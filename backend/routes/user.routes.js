const {Router} = require('express');
const {getUser, editAccount, changePassword, deleteAccount, viewNotifications, acceptRequest, rejectRequest} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/:email', authMiddleware, getUser);
router.put('/account', authMiddleware, editAccount);
router.put('/password', authMiddleware, changePassword);
router.post('/account', authMiddleware, deleteAccount);
router.get('/notifications/:user_id', authMiddleware, viewNotifications);
router.post('/notifications/accept', authMiddleware, acceptRequest);
router.post('/notifications/reject', authMiddleware, rejectRequest);

module.exports = router;