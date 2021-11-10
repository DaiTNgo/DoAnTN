// Test lấy data
document.getElementById('getData').onclick = async () => {
	const arr = await axios.get('http://localhost:3000/api/time');
	arr.data.forEach((element) => {
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
};

document.getElementById('date').onblur = async (e) => {
	const value = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});

	// Tách giờ trong ngày
	const arrDate = [...value.data];
	const arrHour = sliceHour(arrDate, value.data);
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

function sliceHour(arrDate, pureArr) {
	const arrHour = [];
	const length = arrDate.length;
	const start = new Date(arrDate[0].createdAt);
	const TOTAL_MINUTE = 59;
	let startHour = start.getHours();
	let startMinute = start.getMinutes();
	let preIndex = 0;

	for (
		let i = TOTAL_MINUTE - startMinute;
		i < length || pureArr.length !== 0;
		i += 59
	) {
		let isCheckLess = false;
		let isCheckGreater = false;

		if (i > length) {
			i = length - 1;
			isCheckLess = true;
			isCheckGreater = true;
		}
		do {
			if (
				new Date(arrDate[i].createdAt).getTime() <
				new Date(arrDate[i].createdAt).setHours(startHour + 1, 0, 0, 0)
			) {
				isCheckLess = true;
				if (!isCheckGreater) {
					i++;
				}
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrHour.push(pureArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (pureArr.length !== 0)
			startHour = new Date(pureArr[0].createdAt).getHours();
	}
	return arrHour;
}
