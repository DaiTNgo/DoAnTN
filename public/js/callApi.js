document.getElementById('getData').onclick = async () => {
	const a = Date.now();
	const data = await axios.get('http://localhost:3000/api/time');
	console.log(a);
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
	const value = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});
	const arrDate = [...value.data];
	let isCheckLess = false;
	let isCheckGreater = false;
	// const a = value.data[890].createdAt;
	// const b = new Date(a).getTime();
	// const c = new Date(a).setHours(20);
	// console.log(c);
	// console.log(b);
	// console.log(b > c);
	// console.log(new Date(c));
	// console.log(new Date(b));
	const arrHour = [];
	const length = value.data.length;
	const start = new Date(value.data[0].createdAt);
	const end = new Date(value.data[length - 1].createdAt);
	const TOTAL_MINUTE = 59;
	const startHour = start.getHours();
	const startMinute = start.getMinutes();
	const endHour = end.getHours();
	const endMinute = end.getMinutes();
	const preIndex = 0;
	for (let i = TOTAL_MINUTE - startMinute; i < length; i += 59) {
		do {
			if (
				new Date(arrDate[i].createdAt).getTime() <
				new Date(arrDate[i].createdAt).setHours(
					new Date(arrDate[i].createdAt).getHours() + 1
				)
			) {
				isCheckLess = true;
				if (isCheckGreater) {
					return i;
				}
				i++;
			} else {
				isCheckGreater = true;
				i--;
				if (isCheckLess) {
					return i;
				}
			}
		} while (!(isCheckLess && isCheckGreater));
		arrHour = arrHour.push(value.data.splice(0, i - preIndex + 1));
		preIndex = i;
	}
	console.log(arrHour);
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
