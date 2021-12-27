class User {
	// GET /
	index(_, res) {
		res.render('index');
	}
	day(_, res) {
		res.render('day', { name: 'Day' });
	}
	month(_, res) {
		res.render('month', { name: 'Month' });
	}
	hour(_, res) {
		res.render('hour', { name: 'Hour' });
	}
	setting(_, res) {
		res.render('setting');
	}
}
module.exports = new User();
