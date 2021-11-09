const axios = require('axios').default;
async function postData(url = '', data = {}) {
	axios.post(url, data).catch(function (error) {
		console.log(error);
	});
}

module.exports = postData;
