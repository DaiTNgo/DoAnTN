const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
class User {
	// GET
	login(req, res) {
		res.render('login');
	}
	// POST
	async confirm(req, res) {
		const { username, password } = req.body;
		const user = await UserModel.findOne({ username, password });
		if (username.trim() === '' || password.trim() === '') {
			return res.render('login', {
				message: 'Bạn cần điền thông tin vào ô trống',
			});
		}
		if (!user) {
			return res.render('login', {
				message: 'Đăng nhập thất bại',
			});
		}
		const token = jwt.sign(
			{ username, password },
			process.env.ACCESS_TOKEN_SECRET
		);
		return res
			.cookie('token', token, { expires: new Date(Date.now() + 3600000) })
			.redirect('/');
	}
	// GET /
	index(req, res) {
		res.render('index');
	}
	day(req, res) {
		res.render('day');
	}
	month(req, res) {
		res.render('month');
	}
	hour(req, res) {
		res.render('hour');
	}
	// GET /logout
	logout(req, res) {
		res.clearCookie('token').redirect('/login');
	}
}
module.exports = new User();
