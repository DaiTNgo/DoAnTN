// Test lấy data
async () => {
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

// -------------------------------------
/*
function render(arrTime) {
	// setup
	const data = {
		datasets: [
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
				pointStyle: 'circle',
				yAxisID: 'volt',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'volt',
				},
			},
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
				pointStyle: 'rectRot',
				yAxisID: 'amp',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'amp',
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
			plugins: {
				title: {
					display: true,
					text: 'Solar',
					padding: 0,
				},
			},
			scales: {
				x: {
					grid: {
						display: false,
					},
					type: 'time',
					time: {
						unit: 'hour',
						// displayFormats: { minute: 'HH:mm' },
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
						callback: function (value) {
							return value + ' (V)';
						},
					},
				},
				amp: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: 'rgba(54, 162, 235, 1)',
						callback: function (value) {
							return value + ' (A)';
						},
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
						callback: function (value) {
							return value + ' (W)';
						},
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
		document
			.getElementById('myChart')
			.parentElement.removeChild(document.getElementById('myChart'));

	document
		.querySelector('.chartBox')
		.insertAdjacentHTML('afterbegin', `<canvas id="myChart"></canvas>`);
	const myChart = new Chart(document.getElementById('myChart'), config);
}
*/

function renderHourArr(arrTime) {
	const arr = arrTime.map((item) => {
		let volt = 0;
		let amp = 0;
		volt += item.volt;
		amp += item.amp;
		return {
			volt: volt,
			amp: amp,
			power: volt * amp,
			time: new Date(item.createdAt).setSeconds(0, 0),
		};
	});
	return arr;
}

function renderMonthArr(arrTime) {
	const arr = arrTime.map((list) => {
		let volt = 0;
		let amp = 0;
		for (let item of list) {
			volt += item.volt;
			amp += item.amp;
		}
		return {
			volt: volt,
			amp: amp,
			power: volt * amp,
			time: new Date(list[0].createdAt).setHours(0, 0, 0, 0),
		};
	});
	return arr;
}

function renderDayArr(arrTime) {
	const arr = arrTime.map((list) => {
		let volt = 0;
		let amp = 0;
		for (let item of list) {
			volt += item.volt;
			amp += item.amp;
		}
		return {
			volt: volt,
			amp: amp,
			power: volt * amp,
			time: new Date(list[0].createdAt).setMinutes(0, 0, 0),
		};
	});
	return arr;
}
function renderChart(arr) {
	// setup
	const data = {
		datasets: [
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
				pointStyle: 'circle',
				borderWidth: 1,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: 'rgba(255, 26, 104, 1)',
				pointRadius: 3,
				pointHoverRadius: 5,
				yAxisID: 'volt',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'volt',
				},
			},
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

				yAxisID: 'amp',
				parsing: {
					xAxisKey: 'time',
					yAxisKey: 'amp',
				},
				pointStyle: 'circle',
				borderWidth: 1,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: 'rgba(54, 162, 235, 1)',
				pointRadius: 3,
				pointHoverRadius: 5,
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
				pointStyle: 'circle',
				borderWidth: 1,
				tension: 0.1,
				pointBackgroundColor: 'white',
				pointBorderColor: 'rgba(255, 206, 86, 1)',
				pointRadius: 3,
				pointHoverRadius: 5,
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
			plugins: {
				title: {
					display: true,
					text: 'Solar',
					padding: 0,
				},
			},
			scales: {
				x: {
					grid: {
						display: false,
					},
					type: 'time',
					time: {
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
						callback: function (value) {
							return value + ' (V)';
						},
					},
				},
				amp: {
					type: 'linear',
					position: 'left',
					ticks: {
						color: 'rgba(54, 162, 235, 1)',
						callback: function (value) {
							return value + ' (A)';
						},
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
						callback: function (value) {
							return value + ' (W)';
						},
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
		document
			.getElementById('myChart')
			.parentElement.removeChild(document.getElementById('myChart'));

	document
		.querySelector('.chartBox')
		.insertAdjacentHTML('afterbegin', `<canvas id="myChart"></canvas>`);
	const myChart = new Chart(document.getElementById('myChart'), config);
	return myChart;
}
export { renderChart, renderDayArr, renderMonthArr, renderHourArr };
