const express = require('express');
const router = express.Router();
const SolarController = require('../app/controllers/SolarController');

router.post('/', SolarController.send);
router.get('/time', SolarController.receive);
router.delete('/', SolarController.delete);

module.exports = router;
