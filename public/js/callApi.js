document.getElementById('getData').onclick = async () => {
	const a = Date.now();
	const data = await axios.get('http://localhost:3000/api/time');
	console.log(a);
	// console.log(data.data);

	[...data.data].forEach((element) => {
		if (
			Date.parse(element.createdAt) > Date.parse('2021-11-07 17:') &&
			Date.parse(element.createdAt) < Date.parse('2021-11-07 18:')
		)
			console.log(element);
	});

	// axios
	// 	.all([
	// 		axios.get('https://api.github.com/users/anonystick'),
	// 		axios.get('https://api.github.com/users/anonystick'),
	// 	])
	// 	.then(
	// 		axios.spread((obj1, obj2) => {
	// 			// Both requests are now complete
	// 			console.log(
	// 				obj1.data.login +
	// 					' has ' +
	// 					obj1.data.public_repos +
	// 					' public repos on GitHub'
	// 			);
	// 			console.log(
	// 				obj2.data.login +
	// 					' has ' +
	// 					obj2.data.public_repos +
	// 					' public repos on GitHub'
	// 			);
	// 		})
	// 	);
	// let u = 0;
	// let i = 0;
	// data.forEach((item) => {
	// 	if (item.volt && item.amp) {
	// 		u += item.volt;
	// 		i += item.amp;
	// 	} else {
	// 		fetch('http://localhost:3000/api/delete/date', {
	// 			method: 'DELETE',
	// 			mode: 'cors',
	// 			cache: 'no-cache',
	// 			credentials: 'same-origin',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			referrerPolicy: 'no-referrer',
	// 			body: JSON.stringify({
	// 				date: item.createdAt,
	// 			}),
	// 		});
	// 	}
	// });
	// console.log(u);
	// console.log(i);
};

document.getElementById('date').onblur = async (e) => {
	const data = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});
	console.log(data.data);
};
document.getElementById('hour').onblur = async (e) => {
	const data = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/hour',
		data: {
			date: e.target.value,
		},
	});
	console.log(data.data);
};
