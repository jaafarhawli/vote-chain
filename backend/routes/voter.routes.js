const {Router} = require('express');
const {getVoter} = require('../controllers/voter.controller');
const voterMiddleware = require('../middlewares/voter.middleware');
const router = Router();


module.exports = router;