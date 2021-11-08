const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserController = require('../app/controllers/UserController');
const cookies = require('cookie-parser');
require('dotenv').config();

router.get('/login', UserController.login);
router.post('/login', UserController.confirm);


module.exports = router;
