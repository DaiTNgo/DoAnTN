const express = require('express');
const router = express.Router();
const SolarController = require('../app/controllers/SolarController');

router.post('/date', SolarController.getDate);
router.post('/hour', SolarController.getHour);
router.post('/', SolarController.send);
router.get('/time', SolarController.receive);
router.delete('/delete/date', SolarController.deleteDate);
router.delete('/delete', SolarController.delete);

module.exports = router;
