const jwt = require('jsonwebtoken');
class User {
	// GET
	login(req, res) {
		res.render('login');
	}
	// POST
	async confirm(req, res) {
		const { username, password } = req.body;

		if (username.trim() === '' || password.trim() === '') {
			return res.render('login', {
				message: 'Bạn cần điền thông tin vào ô trống',
			});
		}
		const token = jwt.sign(
			{ username, password },
			process.env.ACCESS_TOKEN_SECRET
		);
		return res
			.cookie('token', token, { expires: new Date(Date.now() + 900000) })
			.json('Thanh cong');
	}
}
module.exports = new User();
