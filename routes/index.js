const solarRoute = require('./solar');

function route(app) {
	app.use('/', solarRoute);
}

module.exports = route;
