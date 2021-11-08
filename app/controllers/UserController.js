class User {
	// GET
	login(req, res) {
		res.render('login');
	}
	// POST
	async confirm(req, res) {
		const { username, password } = req.body;
		if (username || password) {
			res.render('login', { message: 'Bạn cần điền thông tin vào ô trống' });
		}
		console.log(username, password);
		return res.json('hi');
	}
}
module.exports = new User();
