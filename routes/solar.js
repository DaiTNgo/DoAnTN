const express = require('express');
const router = express.Router();
const SolarController = require('../app/controllers/SolarController');
router.get('/', (req, res) => {
	res.render('index');
});
router.post('/api', SolarController.send);
router.get('/api', SolarController.receive);
router.delete('/api', SolarController.delete);

module.exports = router;
