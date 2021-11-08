const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const cookies = require('cookie-parser');
require('dotenv').config();
const auth = require('../app/middleware/auth');

router.get('/login', UserController.login);
router.post('/login', UserController.confirm);
router.delete('/logout', auth, UserController.logout);
router.get('/', auth, UserController.index);

module.exports = router;
