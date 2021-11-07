const axios = require('axios');
async function postData(url = '', data = {}) {
	axios.post(url, data).catch(function (error) {
		console.log(error);
	});
}

module.exports = postData;
