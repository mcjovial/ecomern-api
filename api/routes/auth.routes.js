const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  authUser,
} = require('../controllers/auth.controller');
const { authCheck, adminCheck } = require('../middlewares/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authCheck, authUser);
router.get('/admin', authCheck, adminCheck, authUser);

module.exports = router;
