const {Router} = require('express');
const {createElection} = require('../controllers/election.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();

router.post('/', authMiddleware, createElection);

module.exports = router;