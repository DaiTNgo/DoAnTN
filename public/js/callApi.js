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
	const date = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/date',
		data: {
			date: e.target.value,
		},
	});
	// Tách giờ trong ngày
	const arrDate = [...date.data];
	const arrHour = sliceHour(arrDate, date.data);
	console.log(arrHour);
	render(arrHour);
};

document.getElementById('hour').onblur = async (e) => {
	const hour = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/hour',
		data: {
			date: e.target.value,
		},
	});
	console.log(hour.data);
};
document.getElementById('month').onblur = async (e) => {
	const date = e.target.value;
	const currentMonth = new Date(date).getMonth() + 1;
	const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
	let year = new Date(date).getFullYear();
	year = currentMonth === 12 ? year + 1 : year;
	const month = await axios({
		method: 'post',
		url: 'http://localhost:3000/api/month',
		data: {
			currentMonth: `${year}-${currentMonth}-1 0:`,
			nextMonth: `${year}-${nextMonth}-1 0:`,
		},
	});
	const arrDay = sliceDay([...month.data], month.data);
	console.log('~ arrDay', arrDay);
};

function sliceHour(cloneArr, pureArr) {
	/**
	 *  Mình chia nhỏ thời gian trong ngày
	 *  1. hour and minute of first array element
	 *  2. so sánh với, giờ bắt đầu + 1, để lấy hết tất cả element trong khoảng đó
	 *  3. check xem thử nó đã lọc qua lần nào chưa,lọc bé hơn là isCheckLess, lớn hơn là isCheckGreater
	 *  4. nếu bé hơn và isCheckGreater = true thì thoát khỏi vòng lặp, ngược lại thì tăng i++
	 *  5. nếu lớn hơn thì i--
	 *  6. để thoát vòng lặp thì cần isCheckGreater và isCheckLess
	 *
	 *  ------------------------
	 *  ý tưởng:
	 *  1. nếu giờ mà bé hơn thì "tăng thêm", nếu mà nó "lớn hơn" thì mình trừ đi 1 đơn vị mình sẽ lấy từ preIndex -> index
	 *     trừ đi 1 đơn vị để về đúng cái khoảng cần tìm
	 *  2. nếu mà lớn hơn thì mình giảm đi, nếu mà nó bé rồi thì mình chỉ cần lấy từ preIndex -> index
	 *     không cần trừ vì nó đã về đúng khoảng rồi
	 *  3. nếu mà isCheckGreater = false thì i++, nếu = true thì thoát không cần i++ vì đã về đúng khoảng
	 *  4. else i-- mình không cần xét dk cho nó vì nó luôn giảm để về đúng khoảng
	 *  ----------------------------
	 *  TOTAL_MINUTES = 60 vì một phút call 1 lần, 1h call 60 lần
	 *  i < length || cloneArr.length !== 0; vì để kiểm tra xem thử nếu mà i+=60 mà vượt quá length
	 *  nhưng cloneArr chưa rỗng thì mình phải lặp tiếp để lấy tất cả những phần còn lại
	 *  nếu i > length thì mình xét 2 TH:
	 *  1. pureArr[length-1].createdAt < timeline
	 *    - thì mình sẽ lấy tất cả các phần tử từ đầu đến cuối mảng
	 *  2. pureArr[length-1].createdAt > timeline
	 *    - thì mình vẫn theo luồng logic là giảm i đến lúc nào point < timeline thì mình sẽ lấy từ đầu đến điểm i đó
	 *    - rồi lặp lại đến khi hết mảng thì thôi
	 */
	const arrHour = [];
	const length = pureArr.length;
	const start = new Date(pureArr[0].createdAt);
	const MINUTE_MAX = 59;
	const TOTAL_CALL = 60;
	let startHour = start.getHours();
	let startMinute = start.getMinutes();
	let preIndex = 0;

	for (
		let i = MINUTE_MAX - startMinute;
		i < length || cloneArr.length !== 0;
		i += TOTAL_CALL
	) {
		let isCheckLess = false;
		let isCheckGreater = false;

		if (i >= length) {
			i = length - 1;
		}
		do {
			const point = new Date(pureArr[i].createdAt).getTime();
			// new Date(pureArr[i].createdAt): lấy ngày và setHours = startHour + 1
			const timeline = new Date(pureArr[i].createdAt).setHours(
				startHour + 1,
				0,
				0,
				0
			);
			// kiểm tra dk là lúc i > length; khi i>length thì mình gán i = length -1 rồi
			// nên ở đây mình xét nếu i === length - 1

			if (point < timeline && i === length - 1) {
				isCheckLess = true;
				isCheckGreater = true;
				continue;
			}

			if (point < timeline) {
				isCheckLess = true;

				if (!isCheckGreater) {
					i++;
				}
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrHour.push(cloneArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (cloneArr.length !== 0)
			startHour = new Date(cloneArr[0].createdAt).getHours();
	}
	return arrHour;
}
// --------------------------------
function sliceDay(cloneArr, pureArr) {
	const arrDay = [];
	const length = pureArr.length;
	const start = new Date(pureArr[0].createdAt);
	const TOTAL_CALL = (24 * 60) / 5; // giảm đi 5 lần để test còn thực tế thì không / 5;
	let startDay = start.getDate();
	let preIndex = 0;
	let amountDate = getDateInMonth(start.getFullYear(), start.getMonth() + 1);

	for (let i = 0; i < length || cloneArr.length !== 0; i += TOTAL_CALL) {
		let isCheckLess = false;
		let isCheckGreater = false;

		if (i > length) {
			i = length - 1;
		}

		do {
			const point = new Date(pureArr[i].createdAt).getTime();
			let nextDate;
			if (startDay === amountDate) {
				nextDate =
					new Date(pureArr[i].createdAt).setDate(
						startDay === amountDate ? 1 : startDay + 1
					) +
					amountDate * 24 * 60 * 60 * 1000;
			} else {
				nextDate = new Date(pureArr[i].createdAt).setDate(startDay + 1);
			}
			const timeline = new Date(nextDate).setHours(0, 0, 0, 0);

			if (point < timeline && i === length - 1) {
				isCheckLess = true;
				isCheckGreater = true;
				continue;
			}

			if (point < timeline) {
				isCheckLess = true;

				if (!isCheckGreater) {
					i++;
				}
			} else {
				isCheckGreater = true;
				i--;
			}
		} while (!(isCheckLess && isCheckGreater));
		arrDay.push(cloneArr.splice(0, i - preIndex + 1));
		preIndex = i + 1;
		if (cloneArr.length !== 0)
			startDay = new Date(cloneArr[0].createdAt).getDate();
	}
	return arrDay;
}

function getDateInMonth(year, month) {
	let leap = 0;
	const list = [1, 3, 5, 7, 8, 10, 12];
	if (year % 400 === 0) leap = 1;
	else if (year % 100 === 0) leap = 0;
	else if (year % 4 === 0) leap = 1;
	if (month == 2) return 28 + leap;
	const inList = list.findIndex((ele) => ele === month);
	if (inList !== -1) return 31;
	return 30;
}

// -------------------------------------
function render(arrTime) {
	const arr = arrTime.map((list) => {
		const volt = list.reduce((total, crr) => {
			total = total + crr.volt;
			return total;
		}, 0);
		const amp = list.reduce((total, crr) => {
			total = total + crr.amp;
			return total;
		}, 0);
		return {
			volt: volt + Math.random() * 1000,
			amp: amp + Math.random() * 1000,
			power: volt * amp * 1000,
			time: new Date(list[0].createdAt).setMinutes(0, 0, 0),
		};
	});

	// setup

	const data = {
		datasets: [
			{
				label: 'Amp',
				data: arr,
				backgroundColor: [
					'rgba(255, 26, 104, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(0, 0, 0, 0.2)',
				],
				borderColor: [
					'rgba(255, 26, 104, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(0, 0, 0, 1)',
				],
				borderWidth: 3,
				pointStyle: 'triangle',
				yAxisID: 'amp',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'amp',
				},
			},
			{
				label: 'Volt',
				data: arr,
				backgroundColor: [
					'rgba(255, 26, 104, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(0, 0, 0, 0.2)',
				],
				borderColor: [
					'rgba(255, 26, 104, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(0, 0, 0, 1)',
				],
				borderWidth: 3,
				pointStyle: 'triangle',
				yAxisID: 'volt',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'volt',
				},
			},
			{
				label: 'Power',
				data: arr,
				backgroundColor: [
					'rgba(255, 26, 104, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(0, 0, 0, 0.2)',
				],
				borderColor: [
					'rgba(255, 26, 104, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(0, 0, 0, 1)',
				],
				borderWidth: 3,
				pointStyle: 'triangle',
				yAxisID: 'power',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'power',
				},
			},
		],
	};

	// config
	const config = {
		type: 'line',
		data,
		options: {
			scales: {
				x: {
					grid: {
						display: false,
					},
					type: 'time',
					time: {
						unit: 'hour',
						displayFormats: { minute: 'HH:mm' },
					},
				},

				volt: {
					type: 'linear',
					position: 'left',
					grid: {
						display: false,
						borderWidth: 0,
					},
					ticks: {
						color: 'rgba(255, 26, 104, 1)',
					},
				},
				amp: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: 'rgba(54, 162, 235, 1)',
					},
					grid: {
						display: false,
						borderWidth: 0,
					},
				},
				power: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: 'rgba(255, 206, 86, 1)',
					},
					grid: {
						display: false,
						borderWidth: 0,
					},
				},
			},
		},
	};

	// render init block
	if (document.getElementById('myChart'))
		console.log(
			document
				.getElementById('myChart')
				.parentElement.removeChild(document.getElementById('myChart'))
		);

	document
		.querySelector('.chartBox')
		.insertAdjacentHTML('beforeend', `<canvas id="myChart"></canvas>`);
	const myChart = new Chart(document.getElementById('myChart'), config);
}
