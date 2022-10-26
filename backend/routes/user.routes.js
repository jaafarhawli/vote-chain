const {Router} = require('express');
const {getUser} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.get('/:email', authMiddleware, getUser);


module.exports = router;