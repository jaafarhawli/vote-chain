const {Router} = require('express');
const {getUser, editAccount, changePassword, deleteAccount, viewNotifications, acceptRequest, rejectRequest} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

// Get user info from email
router.get('/:email', authMiddleware, getUser);

// Edit account
router.put('/account', authMiddleware, editAccount);

// Change password
router.put('/password', authMiddleware, changePassword);

// Delete account
router.post('/account', authMiddleware, deleteAccount);

// View notifications
router.get('/notifications/:user_id', authMiddleware, viewNotifications);

// Accept notification request
router.post('/notifications/accept', authMiddleware, acceptRequest);

// Reject notification request
router.post('/notifications/reject', authMiddleware, rejectRequest);


module.exports = router;