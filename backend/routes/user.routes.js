const {Router} = require('express');
const {getUser, createElection} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/:email', authMiddleware, getUser);
router.post('/election', authMiddleware, createElection);


module.exports = router;