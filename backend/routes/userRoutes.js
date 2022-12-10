const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { registerUser, loginUser, getMe } = require('../controller/userController');

// @route POST /api/users
// @access PUBLIC
router.post('/', registerUser);

// @route POST /api/users/login
// @access PUBLIC
router.post('/login', loginUser);

// @route GET /api/users/me
// @access PRIVATE
router.get('/me', protect, getMe);

module.exports = router;