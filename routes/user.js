const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

const auth = require('../app/middleware/auth');

router.get('/login', UserController.login);
router.post('/login', UserController.confirm);
router.delete('/logout', auth, UserController.logout);

router.get('/', UserController.index);
router.get('/day', UserController.day);
router.get('/month', UserController.month);
router.get('/hour', UserController.hour);

module.exports = router;
